/*
更新时间: 2021-02-24 13:30
赞赏:中青邀请码`46308484`,农妇山泉 -> 有点咸，万分感谢
本脚本仅适用于中青看点极速版领取青豆
食用说明请查看本仓库目录Taskconf/youth/readme.md，其中打卡挑战赛可通过Boxjs开关，报名时间为23点，早起打卡时间为早5点，报名需1000青豆押金，打卡成功可返1000+青豆，打卡失败则押金不予返还，请注意时间运行，
转发文章获得青豆不实，请无视

*/

const $ = new Env("中青看点");

const notify = $.isNode() ? require('./sendNotify') : '';
//const youthNode = $.isNode() ? require('./youth_env') : '';

// 可设置部分
let notifyInterval = 50; //通知间隔，默认抽奖每50次通知一次，如需关闭全部通知请设为0
let ONCard = "false"; //早起打卡开关
let s = "10"; //转盘延迟时间
let withdrawcash = 1; //提现金额
let cardTime = "06"; //打卡时间

// 需获取部分
let withdrawUrl = "https://kandian.youth.cn/v5/wechat/withdraw2.json"; //提现地址，可选
let withdrawBody = "p=QcTMBiVxDAfc%3DeYMRZIJw4FH0NtWEkgJs0ejE5zBStiMzs4YSlEKO0YxsOwFzAPNtXJ89cR1kRhq2Tun928bn_oLXMnhieaGYJmfLy9ydgLgt5sMtLTB-EziOe_nR36IO8EZlY0NATy-CDjCJthXGjCTpKAlPhHEuLJ8a4a-6v1gm1J5XQg5UGUqygppleV1ES8gOyXhOD1AQrrjHZzs1WVotMaHnRdMzDiH3fPW_UF4jnoyj3NlVmDGLG8rMzPwel3sjxMuBNCZYnYy_iOvXo8MAT-6meQf0IoPBp7pJD0wqs61-9fsui46ZPKSGYguDITMQBpLVQGgtiQS8ifUv4zO56wwM4xmnQXYYkQsPSEu_AfOLQfdarmksX78nLcQUTAUBXYvAaVcRCnYv68PzVuDh4QWQNgWkwzWRtotHRtBT2eqgwITZIrHkvc94zJrk9dg1qIlqwYKx9PXPW0U7ul7jCTFYfPWJQIk_NxyLZRV0115ImeCBM5YamV-_BabZ8zkCknAHgQL6nV7_aUi60vlcOqACCJ4FoDWP4-cdg8Fp3-ICycHHWH1iqu0iPVh7EYODiiRCIZFlZwMLWKEIkevMSvSmTszw05JxRUYQ7tNnMwZmXez-wgbgzwi0qqkpWZpSzz6xJIyS6O_8nUrSFICA34l4HcNLYzeQ3zfh2z9x6UpqA2cgW6XTz84Y_QiuAtK0LjDdLAr_5Ex3cfyXCg6eTeMy5VS72MPBeVTjXYuqF1tM4mtBAiNHTUp3A9VEx6qvh-oNpdlA42HCXLlGxVP7xY8sAzI1c6frjxAVaLTl8UtYVKU7bOl76oJyTml6BIinaBjFv7jsXovoSHJHXhXcpjBvFuQB-1k8sjIMY1KUOHi4DZJcZcCPJmNL_WRkGO-PGtaWypusORC02-ziDzzXasxOuxN8yFem2FxykxHyzovDLvGBqv4k0RcaGGUS_TtJeLnGqmvj_G31dx09wY2R7WaZorvTm91vX7pCRaKnQ-nnxEwjxdiL_opIY93oKYwtSfjO_Dbv4H0g9vFFET5PizA6Z_6E7tJWQordARG66eWiBx1LPNEDcxX-y0yGxnEEak4pIsVXkDcfRcZlgYLUTB1gnn_Cq8t-N83RVuzOLeBxhJXewQybJwnfJBJl3Whhi8ITUw6s_BixZ8Ho32r7suefiJj5x2jJG10FLoQcGEWqZZcd8-KpAwEpE9XXhRD4QssthRamEYF_GnIkfVaPJGBa6bHK9fVnutxfH3bDV3CoE6neSbQsXwW_-hq_eFSRjyVedHMKFt8wECCt_ew_K1Lm1C_LIkQKM38PpLGWNQwWytWyOrUcZopvAcXn9sHB7JUPmceykxS-yyf-HPwdjURjU2LVN7BWQ7I9WrqjuY1rLFf5UDxaENQMiIgc_rRL06DfV5B7hQJwk0Q1zSV6Wy5wlMAS_5wEvjngcilngyiGtWLGHmEqzmmo8Df-ujWQHMUXlNcb811O-c4ZZmMPBOxxebAV0IqxWq1FoyvoYleyRBmIK7s%3DS"; //提现请求，可选
let cookieYouth = "sajssdk_2019_cross_new_user=1; sensorsdata2019jssdkcross=%7B%22distinct_id%22%3A%2258339453%22%2C%22%24device_id%22%3A%2217b35a5bb882bc-09b67030f2b4a3-68491f2c-304128-17b35a5bb89320%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%7D%2C%22first_id%22%3A%2217b35a5bb882bc-09b67030f2b4a3-68491f2c-304128-17b35a5bb89320%22%7D; Hm_lvt_268f0a31fc0d047e5253dd69ad3a4775=1628695359; Hm_lpvt_268f0a31fc0d047e5253dd69ad3a4775=1628696233","Connection":"keep-alive","Referer":"https://kandian.youth.cn/n?timestamp=1628696715&signature=M4o0Aw5xKl6zBEaXnRZDLrD8pT6V7ORZpdmjWQDgY3rey2ON89&native=1&device_type=android&app_version=2.7.3&from=home&access=WIFI&androidid=e0279b90623c713d&app-version=2.7.3&app_version=2.7.3&carrier=%E4%B8%AD%E5%9B%BD%E7%A7%BB%E5%8A%A8&channel=c4015&cookie=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7B1sayyt4VqhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDNm2uGjIbfr8_IapqGcXY&cookie_id=85dc8303a71825fe94b8ed8dccca8c9c&device_brand=HUAWEI&device_id=54863500&device_model=NOH-AN00&device_platform=android&device_type=android&imei=UNKNOWN&inner_version=202012072030&mi=0&oaid=285823e3-8ee9-4305-a013-728749e06286&openudid=e0279b90623c713d&os_api=29&os_version=NOH-AN00+2.0.0.138%28C00E130R6P2%29&request_time=1628696751&resolution=1152x2268&sim=1&sm_device_id=202105072257220ba576345c450ae417836c38c7139ede014c690f433a2608&subv=1.2.2&szlm_ddid=DumZMHqxjYhWRQ5KsRzloITIsaFMRWU%2FSvFc7xqqdsxcVGWT928Alz6gBxIiE6FmCi4vQBMDWOhMPziJyDFrLutg&uid=58339453&version_code=55&version_name=%E4%B8%AD%E9%9D%92%E7%9C%8B%E7%82%B9&zqkey=MDAwMDAwMDAwMJCMpN-w09Wtg5-Bb36eh6CPqHualIejl7B1sayyt4VqhLKp4LDPyGl9onqkj3ZqYJa8Y898najWsJupZLDNm2uGjIbfr8_IapqGcXY&zqkey_id=85dc8303a71825fe94b8ed8dccca8c9c&islogin=1&fontSize=18&exp_id=ali_rec&strategy_id=&retrieve_id=art_high_click_new&log_id=583394531628696714961726&h=2268";
let artBody = "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEzH6qInybB7eqmSYFqaQod4-l-9NIixVjS-dQTYzUTBLx350GYlLRFIoPIUc1HVNc7W03KJnBxSzrF5bTCTTi1GEL-m0SigRv9Fg-VpLFkhbRIOhCNIWkzO1c6DqjKbq8N5q4IuKeJYFCeSGY2kxpfN1ONLOcYxBsvX5ga-bgJmmRhZzCjZNRzkDbPBiVs53qIMBKS0OLrqgPl2KQkPXCA7LIFipvHaMsNEDBPnnXUCtCDmWNwHsjRuKZ9vN5zPW2eZvgzHIdLIYEDQ7PLdUOWn4DZt6PrcPeEmVT2BbqEFPJkcEsYgTlDn5gcEdb6kVkuBBiQ7uEQnRTSb6SrJ-083FwWQYYrKFMdWBg27VpHlair9Iutcq4NCjWGeMfk7T5CTOQTW7xAElCv7tQ63iYoT0oVcOz2hbJmf7QCvPqnKuU3ioRUDVReCcskTfbu3xrGVu6tP2hSgPFp03WFbKWCKFSzJDf6GQ-WwJt2ZxkTJRwpPGNAlY3iz--oETu_uwEdZAwFyzZxq3OCKZkT-89vzAJTz6QnQkcQRfxZwhH1EsKGrb7oeICYIT3t84wYMmdvuotKVbLQTk1t3V4nV0X-o";
let readTimes = "p=9NwGV8Ov71o%3DgW5NEpb6rjb84bkaCQyOq-myT0C-Ktb_fCKUB9tB51NX-3_Fd6evgMFK-0EfYKeLg3pj1_E6-eTCkngeTcxyzk4XUJR62ybmmePFUpfp6p7-0_zbGMY4yjjxIZm32TrP7DtwdpOq1Ok4jQ5ckca1JLR71YHtYBk6dxpAmSUXPshAYeNtR4CqeYDA1mMp--UiyK0Ap1oSga0CWUEXGye5STdFaYAI2aYd1_dxBioNb4qnhsk8viOmoUExcObt4eO8xR_BrPQkyEyXs2GpXJX6BPlz8dmrE8pK_ZGXCkYG8wHACJdryC9EftP-Hr-04_F-Vy72ykwZbOOeeYfP5MhU5pAZTewdK0LaaQXgIOBUDE9R1o0-fhbolMbKQT8F9nbleyKx-qeudtJmDdJhjZQZN5DyehmMDyFigPAFuSUNCM4DnCGl6jPNhKUha6dCQ15_InrhJCyhF-yPm0t6xEeDCcLa_kTuMo2GmfuNzhEZIaNsnbDJWpt5n7V6hg73DcJgSx6DiFibMwsGTXKR7DDntBZFRhVSC3Kfxt3D31wrCrhqPMuWVLWgWqDMmTjogJrSYUPYs_9U0I8gTxEMOE_0AUNDMhNTt0TVBX-QT4Xo0gRLpdSUx1dWUsCadVlsL-UAfpyCbcTwnXAy3NBI6TWkY19eOaiywejom0WhalKelPLD3R2U-bS9Bai_vyepdyPuUerPn5-4qHBO3Rft4rT6EH_ESv1d48-5PgTGse02wmPI5EGRaUK0y-njnTxcbXVCMqPku6-IN0yB6Mbt9wXk6inhcIJ2T-Qb4inkqCMFVc8oQptvD33O1D4Meel_PTI5X2JsH7Rtk6Q%3D";

//声明部分
let rotaryscore = 0,doublerotary = 0;
let cookieArr = [],cookie = '';
let readArr = [],articbody = '';
let timeArr = [],timebody = '';

// 脚本部分
if (isGetCookie = typeof $request !== 'undefined') {
    GetCookie();
    $.done()
} else if (!$.isNode() && !cookieYouth) {
    $.msg($.name, "您未获取中青Cookie", "请进入任务中心获取")
} else {
    !(async() => {
        if (!$.isNode() && cookieYouth.indexOf("#") == -1) {
            cookieArr.push(cookieYouth),
            readArr.push(artBody),
            timeArr.push(readTimes)
        } else {
            if (!$.isNode() && cookieYouth.indexOf("#") > -1) {
                cookieYouth = cookieYouth.split("#"),
                    artBody = artBody.split("&"),
                    readTimes = readTimes.split("&")
            } else if ($.isNode()) {
                if (process.env.YOUTH_HEADER && process.env.YOUTH_HEADER.indexOf('#') > -1) {
                    cookieYouth = process.env.YOUTH_HEADER.split('#')
                } else if (process.env.YOUTH_HEADER && process.env.YOUTH_HEADER.indexOf('\n') > -1) {
                    cookieYouth = process.env.YOUTH_HEADER.split('\n')
                } else {
                    cookieYouth = [process.env.YOUTH_HEADER]
                };
                if (process.env.YOUTH_ARTBODY && process.env.YOUTH_ARTBODY.indexOf('&') > -1) {
                    artBody = process.env.YOUTH_ARTBODY.split('&')
                } else if (process.env.YOUTH_ARTBODY && process.env.YOUTH_ARTBODY.indexOf('\n') > -1) {
                    artBody = process.env.YOUTH_ARTBODY.split('\n')
                } else {
                    artBody = [process.env.YOUTH_ARTBODY]
                };
                if (process.env.YOUTH_TIME && process.env.YOUTH_TIME.indexOf('&') > -1) {
                    readTimes = process.env.YOUTH_TIME.split('&')
                } else if (process.env.YOUTH_TIME && process.env.YOUTH_TIME.indexOf('\n') > -1) {
                    readTimes = process.env.YOUTH_TIME.split('\n')
                } else {
                    readTimes = [process.env.YOUTH_TIME]
                }
            };
            Object.keys(cookieYouth).forEach((item) => {
                if (cookieYouth[item]) {
                    cookieArr.push(cookieYouth[item])
                }
            });
            Object.keys(artBody).forEach((item) => {
                if (artBody[item]) {
                    readArr.push(artBody[item])
                }
            });
            Object.keys(readTimes).forEach((item) => {
                if (readTimes[item]) {
                    timeArr.push(readTimes[item])
                }
            })
        };
        timeZone = new Date().getTimezoneOffset() / 60;
        timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
        bjTime = new Date(timestamp).toLocaleString('zh', {hour12: false, timeZoneName: 'long'});
        $.log(`\n === 脚本执行${bjTime} === \n`);
        $.log(` =========== 您共提供${cookieArr.length}个中青账号 ==========`);
        if (!cookieArr[0]) {
            $.msg($.name, '【提示】请先获取中青看点一cookie', "", {'open-url': "https://kandian.youth.cn/u/mhkjN"});
            return;
        }
        for (let i = 0; i < cookieArr.length; i++) {
            if (cookieArr[i]) {
                cookie = cookieArr[i],
                articbody = readArr[i],
                timebody = timeArr[i],
                $.index = i + 1
            };
            myuid = cookie.match(/uid=\d+/);
            await userInfo();
            nick = nick ? nick : null;
            $.log(`\n ********** ${nick} 现金: ${cash}元 ********\n`);
            await bonusTask();
            await TaskCenter();
            await openbox();
            await getAdVideo();
            await gameVideo();
            await readArticle();
            $.log("开始转盘抽奖任务");
            for (k = 0; k < 5; k++) {
                await $.wait(s * 1000);
                await rotary();
                if (rotaryres.status == 0) {
                    rotarynum = `转盘${rotaryres.msg}🎉`;
                    break
                }
            }
            if (rotaryres.status == 1) {
                $.desc += `【转盘抽奖】 + ${rotaryscore}个青豆剩余${rotarytimes}次\n`;
                $.log(`转盘抽奖: 共计 + ${rotaryscore}个青豆剩余${rotarytimes}次`);
                if (doubleTimes !== 0) {
                    $.desc += `【转盘双倍】 + ${doublerotary}青豆剩余${doubleTimes}次\n`;
                    $.log(`转盘双倍: +${doublerotary}青豆剩余${doubleTimes}次`)
                }
            }
            await earningsInfo();
            await showmsg()
        }
    })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
}

function kdHost(api, body) {
    return {
        url: 'https://kd.youth.cn/' + api + `&${myuid}`,
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Referer': 'https://kd.youth.cn/h5/20190301taskcenter/ios/index.html?' + cookie,
            'Host': 'kd.youth.cn',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: body,
        //timeout: 1000,
    }
}

function userInfo() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/NewTaskIos/getSign'), async(error, resp, data) => {
            signinfo = JSON.parse(data);
            if (signinfo.status == 1) {
                cash = signinfo.data.user.money,
                signday = signinfo.data.sign_day,
                totalscore = signinfo.data.user.score;
                $.sub = `【收益总计】${totalscore}青豆 现金约${cash}元`;
                nick = '账号:' + signinfo.data.user.nickname;
                if (cookieArr.length == 1) {
                    $.setdata(nick, "zq_nick")
                } else {
                    $.setdata("账号" + cookieArr.length + "合一", "zq_nick")
                };
                if (parseInt(cash) >= withdrawcash && !withdrawBody == false) {
                    await withDraw()
                };
                if (signinfo.data.is_sign == false) {
                    await getsign();
                    if (signday == 6) {
                        await SevCont();
                    }
                } else if (signinfo.data.is_sign == true) {
                    $.desc = `【签到结果】🔁 (今天+${signinfo.data.sign_score}青豆)已连签${signday}天\n<本次收益> ：\n`
                };
            } else {
                $.log(signinfo.msg);
                return
            }
            resolve()
        })
    })
}

function TaskCenter() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/NewTaskIos/getTaskList?'), async(error, resp, data) => {
            try {
                taskres = JSON.parse(data);
                //$.log(JSON.stringify(taskres,null,2));
                if (taskres.status == 1) {
                    await friendsign();
                    for (dailys of taskres.list.daily) {
                        button = dailys.but,
                        title = dailys.title,
                        dayid = dailys.id,
                        reward_act = dailys.reward_action;
                        await $.wait(500);
                        $.log("去" + title);
                        if (dailys.status == "2") {
                            $.log(title + "，" + button + "，已领取青豆" + dailys.score);
                            $.desc += `【${title}】✅  ${dailys.score}青豆\n`
                        } else if (dailys.status == "1" && dailys.action != "") {
                            $.log(dailys.title + "已完成 ，去领取奖励青豆");
                            await $.wait(600);
                            await getAction(reward_act)
                        } else if (dailys.status == "0") {
                            if (title == "打卡赚钱" && ONCard == "true") {
                                await CardStatus()
                            } else if (dayid == "7") {
                                await readTime()
                            } else if (title == "元宵额外赚") {
                                await Census()
                            } else if (dayid == "10") {
                                $.log(title + "未完成，去做任务");
                                for (x = 0; x < 5; x++) {
                                    $.log("等待5s执行第" + (x + 1) + "次");
                                    await $.wait(5000);
                                    await recordAdVideo(reward_act)
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                $.log("获取任务失败，" + e)
            } finally {
                resolve()
            }
        })
    })
}

function getAction(acttype) {
    return new Promise((resolve, reject) => {
        $.get(kdHost('WebApi/NewTaskIos/sendTwentyScore?action=' + acttype), (error, resp, data) => {
            let actres = JSON.parse(data);
            if (actres.status == 1) {
                $.log("获得青豆" + actres.score)
            } else if (actres.status == 0) {
                $.log(actres.msg)
            }
            resolve()
        })
    })
}

function getsign() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/NewTaskIos/sign'), async(error, resp, data) => {
            signres = JSON.parse(data);
            if (signres.status == 2) {
                sub = `签到失败，Cookie已失效‼️`;
                $.msg($.name, sub, "");
                return;
            } else if (signres.status == 1) {
                $.desc = `【签到结果】成功 🎉 青豆: +${signres.score}，明日青豆: +${signres.nextScore}\n`;
                await comApp()
            }
            resolve()
        })
    })
}

function getArt() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/ArticleTop/listsNewTag'), async(error, resp, data) => {
            artres = JSON.parse(data);
            if (artres.status == 1) {
                for (arts of artres.data.items) {
                    titlename = arts.title;
                    account = arts.account_id;
                    if (arts.status == "1") {
                        $.log("去转发文章");
                        $.log(titlename + " ----- " + arts.account_name);
                        await artshare(arts.id);
                        break;
                        //await $.wait(500)
                    }
                }
            }
            resolve()
        })
    })
}

function artshare(artsid) {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/ShareNew/getShareArticleReward', cookie + "&" + "article_id=" + artsid), async(error, resp, data) => {
            shareres = JSON.parse(data);
            if (shareres.status == 1) {
                $.log("转发成功，共计转发" + shareres.data.items.share_num + "篇文章，获得青豆" + shareres.data.score)
            }
            resolve()
        })
    })
}

function withDraw() {
    return new Promise((resolve, reject) => {
        const url = {
            url: withdrawUrl,
            headers: {
                'User-Agent': 'KDApp/2.0.0 (iPhone; iOS 14.5; Scale/3.00)'
            },
            body: withdrawBody,
        };
        $.post(url, (error, resp, data) => {
            withDrawres = JSON.parse(data)
            if (withDrawres.error_code == 0) {
                $.desc += `【自动提现】提现${withdrawcash}元成功\n`
                $.msg($.name,$.sub,$.desc)
            } else if (withDrawres.error_code == "10002") {
                $.log(`自动提现失败，${withDrawres.homeTime.text}`)
            } else {
                $.log(`自动提现失败，${withDrawres.message}`)
            }
            resolve()
        })
    })
}

function CardStatus() {
    return new Promise((resolve, reject) => {
        $.get(kdHost('WebApi/PunchCard/getMainData?&' + cookie), async(error, resp, data) => {
            punchcard = JSON.parse(data);
            if (punchcard.code == 1) {
                if (punchcard.data.user.status == 0 && $.time("HH") > "22") {
                    await punchCard()
                } else if (punchcard.data.user.status == 2) {
                    $.log("每日打卡已报名，请每天早晨" + cardTime + "点运行打卡");
                    $.desc += `【打卡报名】🔔 待明早${cardTime}点打卡\n`
                } else if (punchcard.data.user.status == 3 && $.time("HH") == cardTime) {
                    $.log("打卡时间已到，去打卡");
                    await endCard()
                } else if (punchcard.data.user.status == 0) {
                    $.log("今日您未报名早起打卡，报名时间统一设置成晚上23点")
                }
            } else if (punchcard.code == 0) {
                $.log("打卡申请失败" + data)
            }
            resolve();
        })
    })
}

function punchCard() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/PunchCard/signUp'), (error, response, data) => {
            punchcardstart = JSON.parse(data);
            if (punchcardstart.code == 1) {
                $.desc += `【打卡报名】打卡报名${punchcardstart.msg}✅\n`;
                $.log("每日报名打卡成功，报名时间:" + `${$.time('MM-dd HH:mm')}`)
            } else {
                $.desc += `【打卡报名】🔔${punchcardstart.msg}\n`
                    // $.log(punchcardstart.msg)
            }
            resolve();
        })
    })
}

//结束打卡
function endCard() {
        return new Promise((resolve, reject) => {
            $.post(kdHost('WebApi/PunchCard/doCard?'), async(error, resp, data) => {
                punchcardend = JSON.parse(data);
                if (punchcardend.code == 1) {
                    $.desc += `【早起打卡】${punchcardend.data.card_time}${punchcardend.msg}✅ `;
                    $.log("早起打卡成功，打卡时间:" + `${punchcardend.data.card_time}`);
                    await $.wait(1000);
                    await Cardshare()
                } else if (punchcardend.code == 0) {
                    // TODO .不在打卡时间范围内
                    $.desc += `【早起打卡】${punchcardend.msg}\n`;
                    // $.log("不在打卡时间范围内")
                }
                resolve()
            })
        })
    }
    //打卡分享

function Cardshare() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/PunchCard/shareStart?'), async(error, resp, data) => {
            sharestart = JSON.parse(data);
            if (sharestart.code == 1) {
                $.log("等待2s，去打卡分享");
                await $.wait(2000);
                $.post(kdHost('WebApi/PunchCard/shareEnd?'), (error, response, data) => {
                    shareres = JSON.parse(data);
                    if (shareres.code == 1) {
                        $.desc += ` 打卡分享+${shareres.data.score}青豆\n`;
                        $.msg($.name, "", $.desc)
                    } else {
                        //$.desc += `【打卡分享】${shareres.msg}\n`
                        //$.log(`${shareres.msg}`)
                    }
                    resolve()
                })
            }
        })
    })
}


function SevCont() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/PunchCard/luckdraw?'), async(error, resp, data) => {
            let sevres = JSON.parse(data);
            if (sevres.code == 1) {
                $.desc += `【七日签到】 + ${sevres.data.score}青豆\n`
            } else if (sevres.code == 0) {
                //$.desc += `【七日签到】${sevres.msg}\n`;
                //$.log(`七日签到:${sevres.msg}`)
            }
            resolve()
        })
    })
}
function Census() {
    return new Promise((resolve, reject) =>{
    $.post(kdHost('u/Uuz73'),async(error, resp, data) =>{
            resolve()
        })
    })
}
function int() {
        return new Promise((resolve, reject) => {
            let url = {
                url: "https://focus.youth.cn/v/oHi6Z/share?",
                headers: kdHost().headers
            }
            $.post(url, (error, resp, data) => {
                //$.log(resp)
                resolve()
            })
        })
    }
    //开启时段宝箱

function openbox() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/invite/openHourRed'), async(error, resp, data) => {
            let boxres = JSON.parse(data);
            if (boxres.code == 1) {
                boxretime = boxres.data.time;
                $.desc += '【时段宝箱】 +' + boxres.data.score + '青豆，' + boxres.data.time / 60 + '分钟后再次奖励\n';
                await boxshare();
                await getArt();
                await int()
            } else {
                $.log('时段宝箱:' + boxres.msg)
            }
            resolve()
        })
    })
}

//宝箱分享
function boxshare() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/invite/shareEnd'), (error, resp, data) => {
            let shareres = JSON.parse(data);
            if (shareres.code == 1) {
                //$.desc += `【宝箱分享】 + ${shareres.data.score}青豆\n`
            }
            resolve()
        })
    })
}

function friendsign() {
    return new Promise((resolve, reject) => {
        $.get(kdHost('WebApi/ShareSignNew/getFriendActiveList'), async(error, resp, data) => {
            let addsign = JSON.parse(data);
            if (addsign.error_code == "0" && addsign.data.active_list.length > 0) {
                friendsitem = addsign.data.active_list;
                for (friends of friendsitem) {
                    if (friends.button == 1) {
                        await friendSign(friends.uid)
                    }
                }
            }
            resolve()
        })
    })
}

function friendSign(uid) {
    return new Promise((resolve, reject) => {
        $.get(kdHost('WebApi/ShareSignNew/sendScoreV2?friend_uid=' + uid), (error, resp, data) => {
            let friendres = JSON.parse(data);
            if (friendres.error_code == "0") {
                $.desc += '【好友红包】+' + friendres.data[0].score + '个青豆\n';
                $.log('好友签到，我得红包 +' + friendres.data[0].score + '个青豆')
            }
            resolve()
        })
    })
}

//看视频奖励
function getAdVideo() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('taskCenter/getAdVideoReward', 'type=taskCenter'), (error, resp, data) => {
            let adVideores = JSON.parse(data);
            if (adVideores.status == 1) {
                //$.desc += `【观看视频】+${adVideores.score}个青豆\n`;
                $.log("观看视频广告" + adVideores.num + "次 +" + adVideores.score + "青豆")
            }
            resolve()
        })
    })
}

function recordAdVideo(acttype) {
    return new Promise((resolve, reject) => {
        $.get(kdHost('WebApi/NewTaskIos/recordNum?action=' + acttype), async(error, resp, data) => {
            try {
                record = JSON.parse(data);
            } catch (e) {
                $.log("获取任务失败，" + e)
            } finally {
                resolve()
            }
        })
    })
}

function batHost(api, body) {
    return {
        url: 'https://ios.baertt.com/v5/' + api,
        headers: {
            'User-Agent': 'KDApp/2.0.0 (iPhone; iOS 14.5; Scale/3.00)',
            'Host': 'ios.baertt.com',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
}

// 激励视频奖励
function gameVideo() {
    return new Promise((resolve, reject) => {
        $.post(batHost('Game/GameVideoReward.json', articbody), (error, resp, data) => {
            gameres = JSON.parse(data);
            if (gameres.success == true) {
                //$.desc += `【激励视频】${gameres.items.score}\n`
                $.log("激励视频 " + gameres.items.score)
            }
            resolve()
        })
    })
}

function comApp() {
    return new Promise((resolve, reject) => {
        $.post(batHost('mission/msgRed.json', articbody), (error, resp, data) => {
            comres = JSON.parse(data);
            if (comres.success == true) {
                $.desc += `【回访奖励】+${comres.items.score}个青豆\n`
            }
            resolve()
        })
    })
}

//阅读奖励
function readArticle() {
    return new Promise((resolve, reject) => {
        $.post(batHost('article/complete.json', articbody), (error, resp, data) => {
            try {
                readres = JSON.parse(data);
                if (data.indexOf('read_score') > -1 && readres.items.read_score != 0) {
                    $.desc += `【阅读奖励】+${readres.items.read_score}个青豆\n`;
                    $.log(`阅读奖励 +${readres.items.read_score}个青豆`)
                } else if (readres.items.max_notice == '看太久了，换1篇试试') {
                    //$.log(readres.items.max_notice)
                }
            } catch (e) {
                $.logErr(e + resp);
            } finally {
                resolve()
            }
        })
    })
}

function readTime() {
    return new Promise((resolve, reject) => {
        $.post(batHost('user/stay.json', timebody), (error, resp, data) => {
            let timeres = JSON.parse(data);
            if (timeres.error_code == 0) {
                readtimes = timeres.time / 60;
                $.desc += `【阅读时长】共计` + Math.floor(readtimes) + `分钟\n`;
                $.log('阅读时长共计' + Math.floor(readtimes) + '分钟')
            } else {
                if (timeres.error_code == 200001) {
                    $.desc += '【阅读时长】❎ 未获取阅读时长请求\n';
                    $.log(`阅读时长统计失败，原因:${timeres.msg}`)
                }
            }
            resolve()
        })
    })
}

function bonusTask() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/ShareNew/bereadExtraList'), async(error, resp, data) => {
            extrares = JSON.parse(data);
            if (extrares.status == 2) {
                $.log("参数错误" + JSON.stringify(extrares))
            } else if (extrares.status == 1 && extrares.data.taskList[0].status == 1) {
                timestatus = extrares.data.taskList[0].status;
                timetitle = extrares.data.taskList[0].name;
                $.log(timetitle + "可领取，去领青豆");
                await TimePacket()
            }
            resolve()
        })
    })
}

function TimePacket() {
    return new Promise((resolve, reject) => {
        $.post(kdHost('WebApi/TimePacket/getReward', cookie), (error, resp, data) => {
            let timeres = JSON.parse(data);
            if (timeres.code == 1) {
                $.log("获得" + timeres.data.score + "青豆");
                $.desc += "【" + timetitle + "】获得" + timeres.data.score + "青豆\n"
            } else if (timeres.code == 0) {
                $.log(timeres.msg)
            }
            resolve()
        })
    })
}

//转盘任务
function rotary() {
    return new Promise((resolve, reject) => {
        $.post(kdHost(`WebApi/RotaryTable/turnRotary?_=${Date.now()}&`, cookie), async(error, resp, data) => {
            try {
                rotaryres = JSON.parse(data);
                if (rotaryres.status == 0) {
                    rotarynum = `转盘${rotaryres.msg}🎉`;
                    $.log(rotarynum)
                } else if (rotaryres.status == 1) {
                    $.log("等待" + s + "秒进行开始转盘任务");
                    rotaryscore += rotaryres.data.score;
                    rotarytimes = rotaryres.data.remainTurn;
                    doubleTimes = rotaryres.data.doubleNum;
                    $.log("进行" + parseInt(100 - rotarytimes) + "次转盘，获得" + rotaryres.data.score + "青豆");
                    if (rotaryres.data.score != 0 && doubleTimes != 0) {
                        $.log("等待10s，获得双倍青豆")
                        await $.wait(10000);
                        await TurnDouble()
                    }
                    await rotaryCheck()
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}

//转盘宝箱判断
function rotaryCheck() {
    return new Promise(async(resolve) => {
        let i = 0;
        while (i <= 3) {
            if (100 - rotarytimes >= rotaryres.data.chestOpen[i].times && rotaryres.data.chestOpen[i].received == 0) {
                await runRotary(i + 1)
            }
            i++;
        }
        resolve();
    })
}

//开启宝箱
function runRotary(index) {
    return new Promise((resolve, reject) => {
        const rotarbody = cookie + '&num=' + index;
        $.post(kdHost(`WebApi/RotaryTable/chestReward?_=${Date.now()}&`, rotarbody), (error, resp, data) => {
            let rotaryresp = JSON.parse(data);
            if (rotaryresp.status == 1) {
                $.desc += `【转盘宝箱${index}】+${rotaryresp.data.score}个青豆\n`
            } else {
                if (rotaryresp.code == "10010") {
                    $.desc += `【转盘宝箱${index}】+今日抽奖完成\n`
                }
            }
            resolve();
        })
    })
}

//转盘双倍奖励
function TurnDouble() {
    return new Promise((resolve, reject) => {
        $.post(kdHost(`WebApi/RotaryTable/toTurnDouble?_=${Date.now()}&`, cookie), (error, resp, data) => {
            try {
                let Doubleres = JSON.parse(data);
                if (Doubleres.data.is_double == 1) {
                    $.log("获得双倍青豆+" + Doubleres.data.score1);
                    doublerotary += Doubleres.data.score
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve()
            }
        })
    })
}

function earningsInfo() {
    return new Promise((resolve, reject) => {
        $.get(kdHost(`wap/user/balance?` + cookie), (error, response, data) => {
            infores = JSON.parse(data);
            if (infores.status == 0) {
                $.desc += '<收益统计> ：\n'
                for (i = 0; i < infores.history[0].group.length; i++) {
                    $.desc += '【' + infores.history[0].group[i].name + '】' + infores.history[0].group[i].money + '个青豆\n'
                }
                $.desc += '<今日合计>： ' + infores.history[0].score + " 青豆"
            }
            resolve()
        })
    })
}
async function showmsg() {
    if ($.isNode() && rotaryres.status !== 0 && rotarytimes && (100 - rotarytimes) % 95 == 0 && cash >= 10) {
        await notify.sendNotify($.name + " " + nick, "您的余额约为" + cash + "元，已可以提现" + '\n' + $.sub + `\n${$.desc}`)
    } else if (rotaryres.status == 1 && rotarytimes >= 97) {
        $.msg($.name + " " + nick, $.sub, $.desc) //默认前三次为通知
    } else if (rotaryres.status == 1 && rotarytimes % notifyInterval == 0) {
        $.msg($.name + " " + nick, $.sub, $.desc) //转盘次数/间隔整除时通知;
    } else if (rotaryres.status == 1 && rotarytimes == "99") {
        $.msg($.name + "  " + nick + " " + rotarynum, $.sub, $.desc) //转盘剩余1次时通知;
    } else {
        console.log('\n' + $.sub + '\n' + $.desc)
    }
}

function GetCookie(){if($request&&$request.method!=`OPTIONS`&&$request.url.match(/\/NewTaskIos\/getTaskList/)){RefererVal=$request.headers.Referer;signheaderVal=RefererVal.match(/&uid=\d+/)+RefererVal.match(/&cookie=[_a-zA-Z0-9-]+/)+RefererVal.match(/&cookie_id=[a-zA-Z0-9]+/);if(signheaderVal)$.setdata(signheaderVal,'youthheader_zq');$.log(`${$.name}获取Cookie: 成功, signheaderVal: $}`);$.msg($.name,`获取Cookie: 成功🎉`,``)}else if($request&&$request.method!=`OPTIONS`&&$request.url.match(/\/article\/info\/get/)){articlebodyVal=$request.url.split("?")[1];if(articlebodyVal)$.setdata(articlebodyVal,'read_zq');$.log(`${$.name}获取阅读: 成功, articbody: ${articlebodyVal}`);$.msg($.name,`获取阅读请求: 成功🎉`,``)}else if($request&&$request.method!=`OPTIONS`&&$request.url.match(/\/v5\/user\/stay/)){const timebodyVal=$request.body;if(timebodyVal)$.setdata(timebodyVal,'readtime_zq');$.log(`${$.name}获取阅读时长: 成功, timebodyVal: ${timebodyVal}`);$.msg($.name,`获取阅读时长: 成功🎉`,``)}else if($request&&$request.method!=`OPTIONS`&&$request.url.match(/\/withdraw\d?\.json/)){const withdrawVal=$request.body;const withdrawUrl=$request.url;if(withdrawVal)$.setdata(withdrawVal,'cashbody_zq');if(withdrawUrl)$.setdata(withdrawUrl,'cashurl_zq');$.log(`${$.name}, 获取提现请求: 成功, withdrawUrl: ${withdrawUrl}`);$.log(`${$.name}, 获取提现请求: 成功, withdrawBody: ${withdrawVal}`);$.msg($.name,`获取提现请求: 成功🎉`,``)}}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
