class TreasureMap {
    // 静态方法：获取初始线索
    static async getInitialClue() {
        try {
            const clueData = await fetch('clues/clue1.txt').then(res => res.text()); // 请求并解析初始线索文件
            return clueData; // 返回线索数据
        } catch (error) {
            console.error("获取初始线索失败:", error); // 错误处理：打印错误信息
            throw new Error("获取线索失败，请检查文件路径"); // 抛出异常
        }
    }

    // 静态方法：破译炮台密码
    static async decodeCannonCode(clue) {
        try {
            const cannonData = await fetch('clues/cannon.txt').then(res => res.text()); // 请求并解析炮台密码文件
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    const random = Math.random(); // 生成随机数来模拟解码过程中的不确定性
                    if (random < 0.3) {
                        reject("是的，孩子们，我不在行政楼!"); // 如果随机数小于0.3，则模拟失败
                    }
                    resolve(cannonData); // 否则返回解码结果
                }, 3000); // 模拟延迟3秒
            });
        } catch (error) {
            console.error("破译炮台密码失败:", error); // 错误处理：打印错误信息
            throw new Error("破译炮台密码失败"); // 抛出异常
        }
    }

    // 静态方法：突破大坝外墙
    static async breakDamWall() {
        try {
            const damData = await fetch('clues/damwall.txt').then(res => res.text()); // 请求并解析大坝外墙文件
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(damData); // 模拟延迟3秒后返回大坝外墙数据
                }, 3000);
            });
        } catch (error) {
            console.error("突破大坝外墙失败:", error); // 错误处理：打印错误信息
            throw new Error("突破大坝外墙失败"); // 抛出异常
        }
    }

    // 静态方法：打开金库大门
    static async openVault() {
        try {
            const vaultData = await fetch('clues/vault.txt').then(res => res.text()); // 请求并解析金库文件
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(vaultData); // 模拟延迟3秒后返回金库数据
                }, 3000);
            });
        } catch (error) {
            console.error("打开金库大门失败:", error); // 错误处理：打印错误信息
            throw new Error("打开金库大门失败"); // 抛出异常
        }
    }

    // 静态方法：获取奖励
    static async getReward() {
        try {
            const rewardData = await fetch('clues/reward.txt').then(res => res.text()); // 请求并解析奖励文件
            return rewardData; // 返回奖励数据
        } catch (error) {
            console.error("获取奖励失败:", error); // 错误处理：打印错误信息
            throw new Error("获取奖励失败"); // 抛出异常
        }
    }
}

let musicPlaying = true; // 用于控制背景音乐播放的状态
document.getElementById('start-button').disabled = false; 

// 加载玩家数据
function loadPlayerData() {
    const playerData = JSON.parse(localStorage.getItem('playerData')) || {
        playerId: `player-${Date.now()}`, // 如果没有玩家数据则使用当前时间戳作为玩家ID
        playerName: '', // 玩家名字初始化为空
        gameHistory: [] // 玩家游戏历史初始化为空数组
    };
    document.getElementById('player-name-input').value = playerData.playerName; // 将玩家名字填充到输入框
    return playerData; // 返回玩家数据
}

// 保存玩家数据
function savePlayerData(playerData) {
    localStorage.setItem('playerData', JSON.stringify(playerData)); // 将玩家数据存储到本地存储
}

// 播放背景音乐
function playBackgroundMusic(musicFile) {
    const music = new Audio(musicFile); // 创建音频对象
    music.loop = true; // 设置背景音乐循环播放
    music.play(); // 播放音乐
    return music; // 返回音乐对象，以便后续控制
}

// 切换背景音乐的播放和暂停
function toggleMusic(music) {
    if (musicPlaying) {
        music.pause(); // 暂停背景音乐
        document.getElementById('music-toggle').textContent = '开启音乐'; // 更新按钮文字
    } else {
        music.play(); // 播放背景音乐
        document.getElementById('music-toggle').textContent = '关闭音乐'; // 更新按钮文字
    }
    musicPlaying = !musicPlaying; // 切换音乐播放状态
}

// 更新背景图片和对话框内容
function updateBackground(image, message) {
    const background = document.getElementById('background'); // 获取背景元素
    const dialogBox = document.getElementById('dialog-box'); // 获取对话框元素
    
    background.style.backgroundImage = `url('${image}')`; // 更新背景图
    dialogBox.style.display = 'block'; // 显示对话框
    dialogBox.textContent = message; // 更新对话框内容
    
    setTimeout(() => {
        dialogBox.style.opacity = 1; // 设置对话框内容透明度，模拟淡入效果
    }, 100);
}

// 游戏开始，寻找宝藏
async function findTreasure() {
    const playerData = loadPlayerData(); // 加载玩家数据
    try {
        const clue = await TreasureMap.getInitialClue(); // 获取初始线索
        updateBackground('images/Clue.jpg', clue); // 更新背景和对话框内容
        playerData.gameHistory.push(clue); // 记录游戏历史

        const cannon = await TreasureMap.decodeCannonCode(clue); // 解码炮台密码
        updateBackground('images/Cannon.jpg', cannon); // 更新背景和对话框内容
        playerData.gameHistory.push(cannon); // 记录游戏历史
        
        const dam = await TreasureMap.breakDamWall(); // 突破大坝外墙
        updateBackground('images/Damwall.jpg', dam); // 更新背景和对话框内容
        playerData.gameHistory.push(dam); // 记录游戏历史
        
        const vault = await TreasureMap.openVault(); // 打开金库
        updateBackground('images/Vault.jpg', vault); // 更新背景和对话框内容
        playerData.gameHistory.push(vault); // 记录游戏历史
        
        const reward = await TreasureMap.getReward(); // 获取奖励
        updateBackground('images/reward.jpg', reward); // 更新背景和对话框内容
        playerData.gameHistory.push(reward); // 记录游戏历史

        document.getElementById('restart-button').style.display = 'block'; // 显示重启按钮
    } catch (error) {
        console.error("任务失败:", error); // 错误处理：打印错误信息
        updateBackground('images/LaoDa.jpg', error); // 更新背景和对话框内容
        playerData.gameHistory.push(error); // 记录游戏历史
        document.getElementById('restart-button').style.display = 'block'; // 显示重启按钮
    }

    savePlayerData(playerData); // 保存玩家数据
}

// 玩家名称输入框事件：当玩家输入名字时更新按钮状态
document.getElementById('player-name-input').addEventListener('input', () => {
    const playerName = document.getElementById('player-name-input').value.trim(); // 获取输入框的值
    document.getElementById('start-button').disabled = !playerName; // 当用户名为空时禁用按钮
});

// 游戏开始按钮事件
document.getElementById('start-button').addEventListener('click', () => {
    const playerData = loadPlayerData(); // 加载玩家数据
    // 如果玩家没有输入名字，使用默认名字
    const playerName = document.getElementById('player-name-input').value.trim() || `Player-${Date.now()}`;
    playerData.playerName = playerName; // 设置玩家名称
    savePlayerData(playerData); // 保存玩家数据

    document.getElementById('player-input-area').style.display = 'none'; // 隐藏玩家输入区域
    findTreasure(); // 开始寻找宝藏
});

// 重启按钮事件
document.getElementById('restart-button').addEventListener('click', () => {
    document.getElementById('restart-button').style.display = 'none'; // 隐藏重启按钮
    document.getElementById('player-input-area').style.display = 'block'; // 显示玩家输入区域
    updateBackground('images/background.jpg', "破壁者行动，开始游戏..."); // 更新背景和对话框内容
    document.getElementById('music-toggle').style.display
});

document.getElementById('music-toggle').addEventListener('click', () => {
    toggleMusic(backgroundMusic); // 切换背景音乐的播放和暂停
});

let backgroundMusic;

window.addEventListener('load', () => {
    backgroundMusic = playBackgroundMusic('music/Dawn.mp3'); // 初始自动播放背景音乐
    loadPlayerData();
    updateBackground('images/background.jpg', "破壁者行动，开始游戏...");
    document.getElementById('music-toggle').style.display = 'block'; // 页面加载时显示音乐控制按钮
});
