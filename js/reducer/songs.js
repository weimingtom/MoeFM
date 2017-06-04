/**
 * @author: Est <codeest.dev@gmail.com>
 * @date: 2017/5/17
 * @description:
 */

//actions
const ADD_SONG = 'ADD_SONG';        //增加歌曲
const ADD_SONGS = 'ADD_SONGS';      //批量增加歌曲
const PUSH_SONG = 'PUSH_SONG';      //新增歌曲并播放
const DELETE_SONG = 'DELETE_SONG';  //删除歌曲
const CLEAR_SONGS = 'CLEAR_SONGS';  //清空歌曲
const CUT_SONG = 'CUT_SONG';        //切到指定歌曲
const NEXT_SONG = 'NEXT_SONG';      //上一首歌
const LAST_SONG = 'LAST_SONG';      //下一首歌
const PAUSE = 'PAUSE';              //暂停、恢复
const SWITCH_MODE = 'SWITCH_MODE';  //切换播放模式
const PROGRESS = 'PROGRESS';                    //当前进度
const SEEK_PROGRESS = 'SEEK_PROGRESS';          //指定进度

export default function (state, action) {
    if (!state) {
        state = {
            playList: [],           //当前歌单

            currentSong: {},        //当前歌曲信息
            currentIndex: 0,        //当前歌曲序号

            progressTime: 0,        //当前歌曲进度, 秒
            playMode: 'loop',       //当前播放模式
            isPlaying: false,       //当前播放状态
        }
    }
    switch (action.type) {
        case ADD_SONG:
            let newSongIndex = -1;
            for (let [index, song] of state.playList.entries()) {
                if (song.id === action.song.id) {
                    newSongIndex = index;
                    break;
                }
            }
            return newSongIndex !== -1? state:
            {
                ...state,
                playList: [...state.playList, action.song]
            };
        case ADD_SONGS:
            return {
                ...state,
                playList: [...state.playList, action.songs]
            };
        case PUSH_SONG:
            let pushSongIndex = -1;
            for (let i = 0; i< state.playList.length; i++) {
                if (state.playList[i].id === action.song.id) {
                    pushSongIndex = index;
                    break;
                }
            }
            // for (let [index, song] of state.playList.entries()) {
            //     if (song.id === action.song.id) {
            //         pushSongIndex = index;
            //         break;
            //     }
            // }
            return pushSongIndex !== -1? state:
                {
                    ...state,
                    playList: [...state.playList, action.song],
                    currentSong: action.song,
                    currentIndex: pushSongIndex
                };
        case DELETE_SONG:
            return {
                ...state,
                playList: [
                    ...state.playList.slice(0, action.index),
                    ...state.playList.slice(action.index + 1)
                ]
            };
        case CLEAR_SONGS:
            return {
                ...state,
                playList: []
            };
        case CUT_SONG:
            console.log(state.playList);
            let cutSongIndex = -1;
            for (let [index, song] of state.playList.entries()) {
                if (song.id === action.song.id) {
                    cutSongIndex = index;
                    break;
                }
            }
            return cutSongIndex === -1? state:
                {
                    ...state,
                    currentSong: state.playList[cutSongIndex],
                    currentIndex: cutSongIndex
                };
        case NEXT_SONG:
            return {
                ...state,
                currentSong: state.playList[state.currentIndex + 1],
                currentIndex: state.currentIndex + 1
            };
        case LAST_SONG:
            return {
                ...state,
                currentSong: state.playList[state.currentIndex - 1],
                currentIndex: state.currentIndex - 1
            };
        case PAUSE:
            return {
                ...state,
                isPlaying: !state.isPlaying
            };
        case SWITCH_MODE:
            return {
                ...state,
                playMode: getPlayMode(state.playMode)
            };
        case PROGRESS: {
            return {
                ...state,
                progressTime: action.time
            };
        }
        case SEEK_PROGRESS: {
            return {
                ...state,
                progressTime: action.time
            };
        }
        default:
            return state
    }
}

function getPlayMode(mode) {
    switch (mode) {
        case 'loop':
            return 'one';
        case 'one':
            return 'shuffle';
        case 'shuffle':
            return 'loop';
    }
}