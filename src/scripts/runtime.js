'use strict';
require('./common.js');
var UrlTemplate = require('url-template');
export default (function(window){
    var Runtime = {};
    if(window.location.hostname == 'localhost' || window.location.hostname == '127.0.0.1' || window.location.hostname.startsWith('192.168')){
        Runtime.env = 'dev';
    }else{
        Runtime.env = 'prod';
    }
    Runtime.runtime = typeof Client === "undefined" ? 'browser' : 'app';
    if(Runtime.runtime === 'browser' && Runtime.env === 'dev'){
        Runtime.url = {
            api:'http://localhost/api',
            bookbar:'http://localhost/bookbar',
            cmwap:'http://localhost/cmwap'
        }
        Runtime.loadData = function(api, params, callback){
            if(!api){
                throw new Error('Api must be supplied!');
            }
            if (typeof(params) == 'function') {
                callback = params;
                params = {};
            }
            var url = UrlTemplate.parse(api.url).expand(params);
            if(api.cache){
                var cache = Runtime.getCache(url);
                if(cache != null){
                    callback(cache);
                    return;
                }
            }
            if(window.DATA && DATA[api.name]){
                setTimeout(function(){
                    callback(DATA[api.name]);
                }, 200);
                return;
            }
            $.ajax({
                dataType: "json",
                data:{__token__:""},
                url: url,
                success: function(result) {
                    var data = result;
                    if(result.hasOwnProperty('success')){
                        if(!data.success){
                            Runtime.error('请求失败!', data.message);
                            return;
                        }
                        data = data.data;
                    }
                    if (api.cache) {
                        Runtime.setCache(url, data);
                    }
                    callback(data);
                },
                error: function(error, a, b) {
                    console.log("Error loading DATA");
                }
            });
        }
        Runtime.Client = {
            shelfBooks : [],
            hasAddToBookshelf:function(bid, bookstore){
                return false;
            },
            addToBookshelf:function(bookInfo, callback){
                console.debug('添加到书架', bookInfo, callback);
                var data = JSON.parse(bookInfo);
                Client.shelfBooks.push({"iBookId":data.iId, "iOnlineType":data.iBookStore, "iStatus":(data.iStatus == '完本'?1:0), "iCharpterCount":data.iCharpterCount, "iCoverPath":data.iBigCover});
                if(callback){callback.call()};
            },
            /**
             * 获取书架书籍列表
             * @returns {{iBookId: number, iOnlineType: number, iStatus: number, iCharpterCount: number, iReadPercentRaw: number, iFileFullName: string, iCoverPath: string, iHaveNew:boolean}[]}
             */
            getShelfBooks:function(){
                return JSON.stringify(Client.shelfBooks);
            },
            /**
             * 同步书籍连载状态
             * @param iBookId
             * @param iOnlineType
             * @param iStatus 连载状态
             * @param iChapterCount 章节数
             */
            syncBookSerialize:function(iBookId, iOnlineType, iStatus,iChapterCount){
                console.debug("同步书籍连载状态", iBookId, iOnlineType, iStatus, iChapterCount);
            },
            /**
             * 删除书架书籍
             * @param iBookId
             * @param iOnlineType
             * @param iFileFullName 书籍文件路径
             * @param deleteFile 是否删除文件
             */
            deleteShelfBooks:function(iBookId, iOnlineType, iFileFullName, deleteFile){
                console.debug("删除书架书籍", iBookId, iOnlineType);
            },
            /**
             * 更新连载书籍新章节标记
             * @param iBookId
             * @param iOnlineType
             */
            updateNewFlag:function(iBookId, iOnlineType){
                console.debug("更新连载书籍新章节标记", iBookId, iOnlineType);
            },
            /**
             * 手机震动
             */
            vibrate:function(){
                console.debug("震动");
            }
        }
    }else{
        Runtime.url = {
            api:'http://api.ibookstar',
            bookbar:'http://bookbar.ibookstar.com',
            cmwap:'http://api.ibookstar.com/cmwap'
        }
        Runtime.Client = window.Client;
    }

    Runtime.api = {
        circleNav:{url:Runtime.url.api + "/books/store_nav"},
        circleSubjects:{url:Runtime.url.api + "/books/store?offset={offset}&count={count}"},
        subjectSerialize:{url:Runtime.url.api + "/inner/serialize?type={type}&ids={ids}&dynamic={dynamic:0}"}
    }
    for(var o in Runtime.api){
        Runtime.api[o].name = o;
    }

    return Runtime;
})(window);