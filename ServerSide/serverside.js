var tempUsrId;
var seconds = 0,
    i = -1,
    iauthor = -1,
    idoujin = -1,
	igroup = -1;
if (window.localStorage.getItem("HVNData") != null) {
    var JSONData = JSON.parse(window.localStorage.getItem("HVNData"));
    if (JSONData.uploader == undefined) {
        JSONData.uploader = [];
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
    }
    if (JSONData.author == undefined) {
        JSONData.author = [];
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
    }
    if (JSONData.doujin == undefined) {
        JSONData.doujin = [];
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
    }
    if (JSONData.group == undefined) {
        JSONData.group = [];
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
    }
} else {
    var JSONData = {
        uploader: [],
        author: [],
        doujin: [],
		group: []
    };
    window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
}
if (window.localStorage.getItem("HVNNotifications") != null)
    var Notifications = JSON.parse(window.localStorage.getItem("HVNNotifications"));
else {
    var Notifications = [];
    window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
}
var busy = false,
    authorbusy = false,
    doujinbusy = false,
	groupbusy = false;
if (window.localStorage.getItem("notis") == null)
    window.localStorage.setItem("notis", 0);
if (window.localStorage.getItem("updateTime") == null)
    window.localStorage.setItem("updateTime", 10);
else if (window.localStorage.getItem("updateTime") != null && parseInt(window.localStorage.getItem("updateTime")) < 10) {
	alert("Thời gian cập nhật hiện tại của bạn ít hơn 10 giây, vì vậy nên app đã thay đổi thời gian cập nhật của bạn thành 10 giây để tránh lỗi.");
    window.localStorage.setItem("updateTime", 10);
}
if (window.localStorage.getItem("enableNotifications") == null)
    window.localStorage.setItem("enableNotifications", true);
var version = "1.2.1";
var updateTime = "11 tháng 3, 2020";
window.onerror = function(msg, url, line) {
	var ans = confirm("Đã có lỗi xảy ra:\n" + msg + "\ntại địa chỉ: " + url.replace("http://ichika.shiru2005.tk/HVNFollower", "") + "\nở dòng số " + line + "\n\nHãy thử khởi động lại ứng dụng. Nếu lỗi vẫn tiếp tục xảy ra, hãy nhấn OK để báo lỗi này cho LilShieru. Nếu không, hãy nhấn Cancel để bỏ qua.");
	if (ans) {
	    BugReport("auto", msg, url, line);
	}
}
document.getElementById("version").innerText = "v" + version;
document.getElementById("versionInfo").innerText = version;
document.getElementById("updateInfo").innerText = updateTime;
cordova.plugins.backgroundMode.enable();
cordova.plugins.backgroundMode.setDefaults({
    title: "HVN Follower",
    text: "HVN Follower đang chạy bình thường dưới nền.",

    icon: 'icon',
    resume: true
});
window.setInterval(function() {
    seconds++;
    document.getElementById("seconds").innerText = seconds;
    document.getElementById("notis").innerText = "(" + window.localStorage.getItem("notis") + ")";
    if (window.localStorage.getItem("notis") != 0) {
        document.getElementById("notisContainer").style.color = "red";
    } else {
        document.getElementById("notisContainer").style.color = "white";
    }
}, 1000);
window.setInterval(function() {
    if (busy == false) {
        i++;
    }
    if (i == JSONData.uploader.length && busy == false) {
        i = 0;
    }
    if (authorbusy == false) {
        iauthor++;
    }
    if (iauthor == JSONData.author.length && authorbusy == false) {
        iauthor = 0;
    }
    if (doujinbusy == false) {
        idoujin++;
    }
    if (idoujin == JSONData.doujin.length && doujinbusy == false) {
        idoujin = 0;
    }
    if (groupbusy == false) {
        igroup++;
    }
    if (igroup == JSONData.group.length && groupbusy == false) {
        igroup = 0;
    }
	if (JSONData.uploader.length > 0 || JSONData.author.length > 0 || JSONData.doujin.length > 0 || JSONData.group.length > 0) {
		document.getElementById("status").innerText = "\nTiến trình cập nhật:\n";
	}
	else {
		document.getElementById("status").innerText = "Không có Chủ thớt, Tác giả, Doujinshi hay Nhóm dịch nào!";
	}
    if (JSONData.uploader.length > 0) {
        document.getElementById("status").innerText += "Chủ thớt: " + JSONData.uploader[i].name + "\n";
    }
    if (JSONData.author.length > 0) {
        document.getElementById("status").innerText += "Tác giả: " + JSONData.author[iauthor].name + "\n";
    }
    if (JSONData.doujin.length > 0) {
        document.getElementById("status").innerText += "Doujinshi: " + JSONData.doujin[idoujin].name + "\n";
    }
    if (JSONData.group.length > 0) {
        document.getElementById("status").innerText += "Nhóm dịch: " + JSONData.group[igroup].name + "\n";
    }
    if (JSONData.uploader.length > 0) {
        busy = true;
        console.log("Updating Uploader with i=" + i + ": ID - " + JSONData.uploader[i].id + "; Name - " + JSONData.uploader[i].name + ". Comic in LocalStorage is " + window.localStorage.getItem(JSONData.uploader[i].id));
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetComicInfo.php?id=" + JSONData.uploader[i].id, function(data, status) {
            if (status == "success") {
                var comicInfo = JSON.parse(data);
                console.log(JSONData.uploader[i].name + "'s DisplayName: " + comicInfo.displayName);
                if (comicInfo.displayName != JSONData.uploader[i].name) {
                    console.log(JSONData.uploader[i].name + " has a new Name: " + comicInfo.displayName);
                    var oldName = JSONData.uploader[i].name;
                    JSONData.uploader[i].name = comicInfo.displayName;
                    window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
                    console.log(oldName + "'s new DisplayName: " + JSONData.uploader[i].name);
                        var currentdate = new Date();
                        var datetime = currentdate.getDate() + "/" +
                            (currentdate.getMonth() + 1) + "/" +
                            currentdate.getFullYear() + " @ " +
                            currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
                    Notifications[Notifications.length] = {
                        time: datetime,
                        text: "Chủ thớt " + oldName + " đã đổi tên hiển thị thành " + comicInfo.displayName + ", hãy nhớ kĩ để tránh nhầm lẫn về sau!",
                        link: "https://hentaivn.net/user-" + JSONData.uploader[i].id,
                        isread: false
                    };
                    window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
                    window.localStorage.setItem("notis", parseInt(window.localStorage.getItem("notis")) + 1);
                    if (window.localStorage.getItem("enableNotifications") == "true") {
							if ("Notification" in window) {
                                Notification.requestPermission(function(permission) {
                                    if (permission === 'granted') {
                                        var notification = new Notification('HVN Follower', {
                                            tag: 'message1',
                                            body: "Chủ thớt " + oldName + " đã đổi tên hiển thị thành " + comicInfo.displayName + ", hãy nhớ kĩ để tránh nhầm lẫn về sau!"
                                        });
                                        notification.onshow = function() {
                                            console.log('show');
                                        };
                                        notification.onclose = function() {
                                            console.log('close');
                                        };
                                        notification.onclick = function() {
                                            navigator.app.loadUrl("https://hentaivn.net/user-" + JSONData.uploader[i].id)
                                        };
                                    }
                                });
                                navigator.notification.beep(1);
                            }
					}
                }
                if (comicInfo.avatar.indexOf("https://") == -1) {
                    comicInfo.avatar = "https://hentaivn.net" + comicInfo.avatar;
                }
                if (comicInfo.avatar != JSONData.uploader[i].avatar) {
                    JSONData.uploader[i].avatar = comicInfo.avatar;
                    window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
                    console.log(JSONData.uploader[i].name + " has a new Avatar: " + comicInfo.avatar);
                }
                console.log("Got the FirstComic for Uploader " + JSONData.uploader[i].name + ": " + comicInfo.firstComic);
                if (window.localStorage.getItem(JSONData.uploader[i].id) != null) {
                    if (window.localStorage.getItem(JSONData.uploader[i].id) != comicInfo.firstComic) {
                        window.localStorage.setItem(JSONData.uploader[i].id, comicInfo.firstComic);
                        var currentdate = new Date();
                        var datetime = currentdate.getDate() + "/" +
                            (currentdate.getMonth() + 1) + "/" +
                            currentdate.getFullYear() + " @ " +
                            currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
                        Notifications[Notifications.length] = {
                            time: datetime,
                            text: 'Chủ thớt ' + JSONData.uploader[i].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!',
                            link: comicInfo.comicLink,
                            isread: false
                        };
                        console.log("Uploader " + JSONData.uploader[i].name + "has the new comic!");
                        console.log("New " + JSONData.uploader[i].name + "'s LocalStorage into: " + window.localStorage.getItem(JSONData.uploader[i].id));
                        window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
                        window.localStorage.setItem("notis", parseInt(window.localStorage.getItem("notis")) + 1);
                        if (window.localStorage.getItem("enableNotifications") == "true") {
								if ("Notification" in window) {
                                Notification.requestPermission(function(permission) {
                                    if (permission === 'granted') {
                                        var notification = new Notification('HVN Follower', {
                                            tag: 'message1',
                                            body: 'Chủ thớt ' + JSONData.uploader[i].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!'
                                        });
                                        notification.onshow = function() {
                                            console.log('show');
                                        };
                                        notification.onclose = function() {
                                            navigator.app.loadUrl(comicInfo.comicLink)
                                        };
                                        notification.onclick = function() {
                                            navigator.app.loadUrl(comicInfo.comicLink)
                                        };
                                    }
                                    });
                                    navigator.notification.beep(1);
                                }
						}
                    }
                } else {
                    window.localStorage.setItem(JSONData.uploader[i].id, comicInfo.firstComic);
                }
                busy = false;
            }
        });
    }
    if (JSONData.author.length > 0) {
        authorbusy = true;
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetAuthorInfo.php?id=" + JSONData.author[iauthor].id, function(data, status) {
            if (status == "success") {
                var comicInfo = JSON.parse(data);
                console.log("Got the FirstComic for Author " + JSONData.author[iauthor].name + ": " + comicInfo.firstComic);
                if (window.localStorage.getItem(JSONData.author[iauthor].id) != null) {
                    if (window.localStorage.getItem(JSONData.author[iauthor].id) != comicInfo.firstComic) {
                        window.localStorage.setItem(JSONData.author[iauthor].id, comicInfo.firstComic);
                        var currentdate = new Date();
                        var datetime = currentdate.getDate() + "/" +
                            (currentdate.getMonth() + 1) + "/" +
                            currentdate.getFullYear() + " @ " +
                            currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
                        Notifications[Notifications.length] = {
                            time: datetime,
                            text: 'Tác giả ' + JSONData.author[iauthor].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!',
                            link: comicInfo.comicLink,
                            isread: false
                        };
                        console.log("Author " + JSONData.author[iauthor].name + "has the new comic!");
                        console.log("New " + JSONData.author[iauthor].id + "'s LocalStorage into: " + window.localStorage.getItem(JSONData.author[iauthor].id));
                        window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
                        window.localStorage.setItem("notis", parseInt(window.localStorage.getItem("notis")) + 1);
                        if (window.localStorage.getItem("enableNotifications") == "true") {
								if ("Notification" in window) {
                                    Notification.requestPermission(function(permission) {
                                        if (permission === 'granted') {
                                            var notification = new Notification('HVN Follower', {
                                                tag: 'message1',
                                                body: 'Tác giả ' + JSONData.author[iauthor].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!'
                                            });
                                            notification.onshow = function() {
                                                console.log('show');
                                            };
                                            notification.onclose = function() {
                                                navigator.app.loadUrl(comicInfo.comicLink)
                                            };
                                            notification.onclick = function() {
                                                navigator.app.loadUrl(comicInfo.comicLink)
                                            };
                                        }
                                    });
                                    navigator.notification.beep(1);
                                }
						}
                    }
                } else {
                    window.localStorage.setItem(JSONData.author[iauthor].id, comicInfo.firstComic);
                }
                authorbusy = false;
            }
        });
    }
    if (JSONData.doujin.length > 0) {
        doujinbusy = true;
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetDoujinInfo.php?id=" + JSONData.doujin[idoujin].id, function(data, status) {
            if (status == "success") {
                var comicInfo = JSON.parse(data);
                console.log("Got the FirstComic for doujin " + JSONData.doujin[idoujin].name + ": " + comicInfo.firstComic);
                if (window.localStorage.getItem(JSONData.doujin[idoujin].id) != null) {
                    if (window.localStorage.getItem(JSONData.doujin[idoujin].id) != comicInfo.firstComic) {
                        window.localStorage.setItem(JSONData.doujin[idoujin].id, comicInfo.firstComic);
                        var currentdate = new Date();
                        var datetime = currentdate.getDate() + "/" +
                            (currentdate.getMonth() + 1) + "/" +
                            currentdate.getFullYear() + " @ " +
                            currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
                        Notifications[Notifications.length] = {
                            time: datetime,
                            text: 'Doujinshi ' + JSONData.doujin[idoujin].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!',
                            link: comicInfo.comicLink,
                            isread: false
                        };
                        console.log("doujin " + JSONData.doujin[idoujin].name + "has the new comic!");
                        console.log("New " + JSONData.doujin[idoujin].id + "'s LocalStorage into: " + window.localStorage.getItem(JSONData.doujin[idoujin].id));
                        window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
                        window.localStorage.setItem("notis", parseInt(window.localStorage.getItem("notis")) + 1);
                        if (window.localStorage.getItem("enableNotifications") == "true") {
								if ("Notification" in window) {
                                    Notification.requestPermission(function(permission) {
                                        if (permission === 'granted') {
                                            var notification = new Notification('HVN Follower', {
                                                tag: 'message1',
                                                body: 'Doujinshi ' + JSONData.doujin[idoujin].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!'
                                            });
                                            notification.onshow = function() {
                                                console.log('show');
                                            };
                                            notification.onclose = function() {
                                                navigator.app.loadUrl(comicInfo.comicLink)
                                            };
                                            notification.onclick = function() {
                                                navigator.app.loadUrl(comicInfo.comicLink)
                                            };
                                        }
                                    });
                                    navigator.notification.beep(1);
                                }
						}
                    }
                } else {
                    window.localStorage.setItem(JSONData.doujin[idoujin].id, comicInfo.firstComic);
                }
                doujinbusy = false;
            }
        });
    }
    if (JSONData.group.length > 0) {
        groupbusy = true;
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetGroupInfo.php?id=" + JSONData.group[igroup].id, function(data, status) {
            if (status == "success") {
                var comicInfo = JSON.parse(data);
                console.log("Got the FirstComic for group " + JSONData.group[igroup].name + ": " + comicInfo.firstComic);
                if (window.localStorage.getItem(JSONData.group[igroup].id) != null) {
                    if (window.localStorage.getItem(JSONData.group[igroup].id) != comicInfo.firstComic) {
                        window.localStorage.setItem(JSONData.group[igroup].id, comicInfo.firstComic);
                        var currentdate = new Date();
                        var datetime = currentdate.getDate() + "/" +
                            (currentdate.getMonth() + 1) + "/" +
                            currentdate.getFullYear() + " @ " +
                            currentdate.getHours() + ":" +
                            currentdate.getMinutes() + ":" +
                            currentdate.getSeconds();
                        Notifications[Notifications.length] = {
                            time: datetime,
                            text: 'Nhóm dịch ' + JSONData.group[igroup].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!',
                            link: comicInfo.comicLink,
                            isread: false
                        };
                        console.log("group " + JSONData.group[igroup].name + "has the new comic!");
                        console.log("New " + JSONData.group[igroup].id + "'s LocalStorage into: " + window.localStorage.getItem(JSONData.group[igroup].id));
                        window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
                        window.localStorage.setItem("notis", parseInt(window.localStorage.getItem("notis")) + 1);
                        if (window.localStorage.getItem("enableNotifications") == "true") {
								if ("Notification" in window) {
                                    Notification.requestPermission(function(permission) {
                                        if (permission === 'granted') {
                                            var notification = new Notification('HVN Follower', {
                                                tag: 'message1',
                                                body: 'Nhóm dịch ' + JSONData.group[igroup].name + ' đã có truyện mới "' + comicInfo.firstComic + '", vào xem nhanh kẻo muộn nào!'
                                            });
                                            notification.onshow = function() {
                                                console.log('show');
                                            };
                                            notification.onclose = function() {
                                                navigator.app.loadUrl(comicInfo.comicLink)
                                            };
                                            notification.onclick = function() {
                                                navigator.app.loadUrl(comicInfo.comicLink)
                                            };
                                        }
                                    });
                                    navigator.notification.beep(1);
                                }
						}
                    }
                } else {
                    window.localStorage.setItem(JSONData.group[igroup].id, comicInfo.firstComic);
                }
                groupbusy = false;
            }
        });
    }
}, parseInt(window.localStorage.getItem("updateTime")) * 1000);

function Main() {
    document.getElementById("nav1").style.background = "#1a68d4";
    document.getElementById("nav2").style.background = "#5a9bf5";
    document.getElementById("nav3").style.background = "#5a9bf5";
    document.getElementById("nav4").style.background = "#5a9bf5";
    document.getElementById("mainMenu").style.display = "";
    document.getElementById("followerList").style.display = "none";
    document.getElementById("notificationList").style.display = "none";
    document.getElementById("settings").style.display = "none";
}

function List() {
    document.getElementById("nav1").style.background = "#5a9bf5";
    document.getElementById("nav2").style.background = "#1a68d4";
    document.getElementById("nav3").style.background = "#5a9bf5";
    document.getElementById("nav4").style.background = "#5a9bf5";
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("followerList").style.display = "";
    document.getElementById("notificationList").style.display = "none";
    document.getElementById("settings").style.display = "none";
    JSONData = JSON.parse(window.localStorage.getItem("HVNData"));
    if (JSONData.uploader.length == 0) {
        document.getElementById("ctContainer").innerText = "Không có Chủ thớt nào được thêm.";
    } else {
        document.getElementById("ctContainer").innerHTML = "";
        var i;
        for (i = 0; i < JSONData.uploader.length; i++) {
            document.getElementById("ctContainer").innerHTML += '<div id="list" style="height:80px"><img style="margin-top:5px" width=32 height=32 src="' + JSONData.uploader[i].avatar + '" /> <span style="font-size:14px;margin:auto"><b>' + JSONData.uploader[i].name + '</b></span><span style="font-size:14px;float:right;color:gray;padding-top:12px;padding-right:10px;">ID: ' + JSONData.uploader[i].id + '</span><br><button onclick="deleteCt(' + i + ')" style="float:right;margin:5px;">Xóa Chủ thớt</button></div>';
        }
    }
    if (JSONData.author.length == 0) {
        document.getElementById("authorContainer").innerText = "Không có Tác giả nào được thêm.";
    } else {
        document.getElementById("authorContainer").innerHTML = "";
        var i;
        for (i = 0; i < JSONData.author.length; i++) {
            document.getElementById("authorContainer").innerHTML += '<div id="list" style="height:38px"><span style="font-size:14px"><b>' + JSONData.author[i].name + '</b></span><button onclick="deleteAuthor(' + i + ')" style="float:right;margin:5px;">Xóa Tác giả</button></div>';
        }
    }
    if (JSONData.doujin.length == 0) {
        document.getElementById("doujinContainer").innerText = "Không có Doujinshi nào được thêm.";
    } else {
        document.getElementById("doujinContainer").innerHTML = "";
        var i;
        for (i = 0; i < JSONData.doujin.length; i++) {
            document.getElementById("doujinContainer").innerHTML += '<div id="list" style="height:38px"><span style="font-size:14px"><b>' + JSONData.doujin[i].name + '</b></span><button onclick="deleteDoujin(' + i + ')" style="float:right;margin:5px;">Xóa Doujinshi</button></div>';
        }
    }
    if (JSONData.group.length == 0) {
        document.getElementById("groupContainer").innerText = "Không có Nhóm dịch nào được thêm.";
    } else {
        document.getElementById("groupContainer").innerHTML = "";
        var i;
        for (i = 0; i < JSONData.group.length; i++) {
            document.getElementById("groupContainer").innerHTML += '<div id="list" style="height:38px"><span style="font-size:14px"><b>' + JSONData.group[i].name + '</b></span><button onclick="deleteGroup(' + i + ')" style="float:right;margin:5px;">Xóa Nhóm dịch</button></div>';
        }
    }
}

function Notis() {
    document.getElementById("nav1").style.background = "#5a9bf5";
    document.getElementById("nav2").style.background = "#5a9bf5";
    document.getElementById("nav3").style.background = "#1a68d4";
    document.getElementById("nav4").style.background = "#5a9bf5";
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("followerList").style.display = "none";
    document.getElementById("notificationList").style.display = "";
    document.getElementById("settings").style.display = "none";
    if (Notifications.length == 0) {
        document.getElementById("notiContainer").innerText = "Không có thông báo nào.";
    } else {
        document.getElementById("notiContainer").innerHTML = "";
        var i;
        for (i = Notifications.length - 1; i >= 0; i--) {
            if (!Notifications[i].isread) {
                document.getElementById("notiContainer").innerHTML += '<div id="list" style="background-color:#26cdd2"><div style="color:gray;font-size:14px">' + Notifications[i].time + '</div><div>' + Notifications[i].text + '</div><div style="text-align:right"><br><a onclick="navigator.app.loadUrl(\'' + Notifications[i].link + '\', { openExternal:true });"><button>Xem truyện mới</button></div></div>';
                Notifications[i].isread = true;
            } else {
                document.getElementById("notiContainer").innerHTML += '<div id="list"><div style="color:gray;font-size:14px">' + Notifications[i].time + '</div><div>' + Notifications[i].text + '</div><div style="text-align:right"><br><a onclick="navigator.app.loadUrl(\'' + Notifications[i].link + '\', { openExternal:true });"><button>Xem truyện mới</button></div></div>';
            }
        }
        window.localStorage.setItem("notis", 0);
        window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
    }
}

function Settings() {
    document.getElementById("nav1").style.background = "#5a9bf5";
    document.getElementById("nav2").style.background = "#5a9bf5";
    document.getElementById("nav3").style.background = "#5a9bf5";
    document.getElementById("nav4").style.background = "#1a68d4";
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("followerList").style.display = "none";
    document.getElementById("notificationList").style.display = "none";
    document.getElementById("settings").style.display = "";
    document.getElementById("updateTime").value = window.localStorage.getItem("updateTime");
    if (window.localStorage.getItem("enableNotifications") == "true") {
        document.getElementById("enableNotifications").checked = "checked";
    } else {}
}

function ctList() {
    document.getElementById("btn1").style.background = "#1a68d4";
    document.getElementById("btn2").style.background = "#5a9bf5";
    document.getElementById("btn3").style.background = "#5a9bf5";
    document.getElementById("btn4").style.background = "#5a9bf5";
    document.getElementById("ctList").style.display = "";
    document.getElementById("authorList").style.display = "none";
    document.getElementById("doujinList").style.display = "none";
    document.getElementById("groupList").style.display = "none";
}

function authorList() {
    document.getElementById("btn1").style.background = "#5a9bf5";
    document.getElementById("btn2").style.background = "#1a68d4";
    document.getElementById("btn3").style.background = "#5a9bf5";
    document.getElementById("btn4").style.background = "#5a9bf5";
    document.getElementById("ctList").style.display = "none";
    document.getElementById("authorList").style.display = "";
    document.getElementById("doujinList").style.display = "none";
    document.getElementById("groupList").style.display = "none";
}

function doujinList() {
    document.getElementById("btn1").style.background = "#5a9bf5";
    document.getElementById("btn2").style.background = "#5a9bf5";
    document.getElementById("btn3").style.background = "#1a68d4";
    document.getElementById("btn4").style.background = "#5a9bf5";
    document.getElementById("ctList").style.display = "none";
    document.getElementById("authorList").style.display = "none";
    document.getElementById("doujinList").style.display = "";
    document.getElementById("groupList").style.display = "none";
}

function groupList() {
    document.getElementById("btn1").style.background = "#5a9bf5";
    document.getElementById("btn2").style.background = "#5a9bf5";
    document.getElementById("btn3").style.background = "#5a9bf5";
    document.getElementById("btn4").style.background = "#1a68d4";
    document.getElementById("ctList").style.display = "none";
    document.getElementById("authorList").style.display = "none";
    document.getElementById("doujinList").style.display = "none";
    document.getElementById("groupList").style.display = "";
}
// Get the <span> element that closes the modal
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("status").innerText = "Sẵn sàng.";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.getElementById("status").innerText = "Sẵn sàng.";
    }
}

function getSecondPart(str) {
    return str.split('-')[1];
}

function addUsr() {
    document.getElementById("status").innerText = "Đang kiểm tra thông tin...";
    var value = document.getElementById("usrLink").value;
    if (value.indexOf("hentaivn.net/user-") != -1 || value.indexOf("hentaivn.net/forum/user-") != -1) {
        var userid = getSecondPart(value);
        tempUsrId = userid;
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetFullInfo.php?id=" + userid, function(data, status) {
            if (status == "success") {
                if (data == "User is invalid") {
                    alert('Chủ thớt này không tồn tại!');
                    document.getElementById("status").innerText = "Sẵn sàng.";
                } else {
                    document.getElementById("status").innerText = "Lấy thông tin thành công!";
                    document.getElementById("content").style.color = "black";
                    document.getElementById("content").innerText = "Xác nhận thêm Chủ thớt này vào danh sách theo dõi?";
                    document.getElementById("okBtn").style.display = "inline-block";
                    document.getElementById("cancelBtn").style.width = "50%";
                    var info = JSON.parse(data);
                    modal.style.display = "block";

                    if (info.avatar.indexOf("https://") == -1) {
                        info.avatar = "https://hentaivn.net" + info.avatar;
                    }
                    if (info.group == "none") {
                        document.getElementById("groupContainer").style.display = "none";
                    } else {
                        document.getElementById("groupContainer").style.display = "";
                    }
                    if (info.additionalInfo.indexOf("Banned") != -1) {
                        document.getElementById("content").style.color = "red";
                        document.getElementById("content").innerText = "Chủ thớt này đang bị khóa phạt, vì vậy nên bạn chưa thể thêm Chủ thớt này vào danh sách theo dõi.";
                        document.getElementById("okBtn").style.display = "none";
                        document.getElementById("cancelBtn").style.width = "100%";
                    }

                    document.getElementById("avatar").src = info.avatar;
                    document.getElementById("displayName").innerText = info.displayName;
                    document.getElementById("group").innerText = info.group;
                    document.getElementById("gender").innerText = info.gender;
                    document.getElementById("joined").innerText = info.joined;
                    document.getElementById("comment").innerText = info.comments;
                    document.getElementById("like").innerText = info.likes;
                    document.getElementById("yen").innerText = info.yen;
                }
            } else {
                document.getElementById("status").innerText = "Không thể lấy được thông tin!";
            }
        }).fail(function() { alert("Không thể kết nối tới máy chủ!\nVui lòng thử lại sau.") });;
    } else {
        alert("Định dạng link không hợp lệ!");
    }
}

function addAuthor() {
    document.getElementById("status").innerText = "Đang kiểm tra thông tin...";
    var value = document.getElementById("usrLink").value;
    if (value.indexOf("https://") == -1 && value.length > 0) {
        var userid = value.replace(" ", "+");
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetAuthorInfo.php?id=" + userid, function(data, status) {
            if (status == "success") {
                if (data == "Author is invalid") {
                    alert('Tác giả này không tồn tại!');
                    document.getElementById("status").innerText = "Sẵn sàng.";
                } else {
                    document.getElementById("status").innerText = "Lấy thông tin thành công!";
                    var info = JSON.parse(data);
                    var ans = confirm("Thêm tác giả " + info.displayName + " vào Danh sách theo dõi?");
                    if (ans) {
                        var exist = false,
                            i;
                        for (i = 0; i < JSONData.author.length; i++) {
                            if (JSONData.author[i].name != info.displayName) {
                                if (!exist) {
                                    exist = false;
                                }
                            } else {
                                exist = true;
                            }
                        }
                        if (exist == false) {
                            JSONData.author[JSONData.author.length] = {
                                id: userid,
                                name: info.displayName
                            };
                            window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
                            alert('Thêm Tác giả thành công!');
                            document.getElementById("usrLink").value = "";
                            document.getElementById("status").innerText = "Sẵn sàng.";
                        } else {
                            alert('Bạn đã thêm Tác giả này rồi!');
                            document.getElementById("usrLink").value = "";
                            document.getElementById("status").innerText = "Sẵn sàng.";
                        }
                    }
                }
            } else {
                document.getElementById("status").innerText = "Không thể lấy được thông tin!";
            }
        }).fail(function() { alert("Không thể kết nối tới máy chủ!\nVui lòng thử lại sau.") });;
    } else {
        alert("Tên tác giả không hợp lệ!");
    }
}

function addDoujin() {
    document.getElementById("status").innerText = "Đang kiểm tra thông tin...";
    var value = document.getElementById("usrLink").value;
    if (value.indexOf("https://") == -1 && value.length > 0) {
        var userid = value.replace(" ", "+");
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetDoujinInfo.php?id=" + userid, function(data, status) {
            if (status == "success") {
                if (data == "Doujin is invalid") {
                    alert('Doujinshi này không tồn tại!');
                    document.getElementById("status").innerText = "Sẵn sàng.";
                } else {
                    document.getElementById("status").innerText = "Lấy thông tin thành công!";
                    var info = JSON.parse(data);
                    var ans = confirm("Thêm Doujinshi " + info.displayName + " vào Danh sách theo dõi?");
                    if (ans) {
                        var exist = false,
                            i;
                        for (i = 0; i < JSONData.doujin.length; i++) {
                            if (JSONData.doujin[i].name != info.displayName) {
                                if (!exist) {
                                    exist = false;
                                }
                            } else {
                                exist = true;
                            }
                        }
                        if (exist == false) {
                            JSONData.doujin[JSONData.doujin.length] = {
                                id: userid,
                                name: info.displayName
                            };
                            window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
                            alert('Thêm Doujinshi thành công!');
                            document.getElementById("usrLink").value = "";
                            document.getElementById("status").innerText = "Sẵn sàng.";
                        } else {
                            alert('Bạn đã thêm Doujinshi này rồi!');
                            document.getElementById("usrLink").value = "";
                            document.getElementById("status").innerText = "Sẵn sàng.";
                        }
                    }
                }
            } else {
                document.getElementById("status").innerText = "Không thể lấy được thông tin!";
            }
        }).fail(function() { alert("Không thể kết nối tới máy chủ!\nVui lòng thử lại sau.") });;
    } else {
        alert("Tên Doujinshi không hợp lệ!");
    }
}

function addGroup() {
    document.getElementById("status").innerText = "Đang kiểm tra thông tin...";
    var value = document.getElementById("usrLink").value;
    if (value.indexOf("https://") == -1 && value.length > 0) {
        var userid = value.replace(" ", "").replace(" ", "").replace(" ", "").replace("-", "")
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D");
        $.get("http://hvnfollower.herokuapp.com/HVNFollower/API/GetGroupInfo.php?id=" + userid, function(data, status) {
            if (status == "success") {
                if (data == "Group is invalid") {
                    alert('Nhóm dịch này không tồn tại!');
                    document.getElementById("status").innerText = "Sẵn sàng.";
                } else {
                    document.getElementById("status").innerText = "Lấy thông tin thành công!";
                    var info = JSON.parse(data);
                    var ans = confirm("Thêm Nhóm dịch " + info.displayName + " vào Danh sách theo dõi?");
                    if (ans) {
                        var exist = false,
                            i;
                        for (i = 0; i < JSONData.group.length; i++) {
                            if (JSONData.group[i].name != info.displayName) {
                                if (!exist) {
                                    exist = false;
                                }
                            } else {
                                exist = true;
                            }
                        }
                        if (exist == false) {
                            JSONData.group[JSONData.group.length] = {
                                id: userid,
                                name: info.displayName
                            };
                            window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
                            alert('Thêm Nhóm dịch thành công!');
                            document.getElementById("usrLink").value = "";
                            document.getElementById("status").innerText = "Sẵn sàng.";
                        } else {
                            alert('Bạn đã thêm Nhóm dịch này rồi!');
                            document.getElementById("usrLink").value = "";
                            document.getElementById("status").innerText = "Sẵn sàng.";
                        }
                    }
                }
            } else {
                document.getElementById("status").innerText = "Không thể lấy được thông tin!";
            }
        }).fail(function() { alert("Không thể kết nối tới máy chủ!\nVui lòng thử lại sau.") });;
    } else {
        alert("Tên Nhóm dịch không hợp lệ!");
    }
}

function clickButton() {
    if (document.getElementById("usrType").value == "chuthot") {
        addUsr();
    } else if (document.getElementById("usrType").value == "author") {
        addAuthor();
    } else if (document.getElementById("usrType").value == "doujin") {
        addDoujin();
    } else if (document.getElementById("usrType").value == "group") {
        addGroup();
    }
}

function changeType() {
    if (document.getElementById("usrType").value == "chuthot") {
        document.getElementById("beginText").innerText = "Nhập Link User của Chủ thớt (https://hentaivn.net/user-xxxxx):";
    } else if (document.getElementById("usrType").value == "author") {
        document.getElementById("beginText").innerText = "Nhập tên tác giả muốn thêm:";
    } else if (document.getElementById("usrType").value == "doujin") {
        document.getElementById("beginText").innerText = "Nhập tên Doujinshi muốn thêm:";
    } else if (document.getElementById("usrType").value == "group") {
        document.getElementById("beginText").innerText = "Nhập tên Nhóm dịch muốn thêm:";
    }
}

function ConfirmAddUsr() {
    var exist = false,
        i;
    for (i = 0; i < JSONData.uploader.length; i++) {
        if (JSONData.uploader[i].id != tempUsrId) {
            if (!exist) {
                exist = false;
            }
        } else {
            exist = true;
        }
    }
    if (exist == false) {
        JSONData.uploader[JSONData.uploader.length] = {
            id: tempUsrId,
            avatar: document.getElementById("avatar").src,
            name: document.getElementById("displayName").innerText
        };
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
        alert('Thêm Chủ thớt thành công!');
        document.getElementById("usrLink").value = "";
        modal.style.display = "none";
        document.getElementById("status").innerText = "Sẵn sàng.";
    } else {
        alert('Bạn đã thêm Chủ thớt này rồi!');
        document.getElementById("usrLink").value = "";
        modal.style.display = "none";
        document.getElementById("status").innerText = "Sẵn sàng.";
    }
}

function deleteCt(i) {
    var ans = confirm("Xác nhận xóa Chủ thớt " + JSONData.uploader[i].name + " ra khỏi Danh sách theo dõi?");
    if (ans) {
        window.localStorage.removeItem(JSONData.uploader[i].id);
        JSONData.uploader.splice(i, 1);
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
        alert("Xóa Chủ thớt thành công.");
        if (JSONData.uploader.length == 0) {
            document.getElementById("ctContainer").innerText = "Không có Chủ thớt nào được thêm.";
        } else {
            document.getElementById("ctContainer").innerHTML = "";
            var i;
            for (i = 0; i < JSONData.uploader.length; i++) {
                document.getElementById("ctContainer").innerHTML += '<div id="list" style="height:80px"><img style="margin-top:5px" width=32 height=32 src="' + JSONData.uploader[i].avatar + '" /> <span style="font-size:14px;margin:auto"><b>' + JSONData.uploader[i].name + '</b></span><span style="font-size:14px;float:right;color:gray;padding-top:12px;padding-right:10px;">ID: ' + JSONData.uploader[i].id + '</span><br><button onclick="deleteCt(' + i + ')" style="float:right;margin:5px;">Xóa Chủ thớt</button></div>';
            }
        }
    }
}

function deleteAuthor(i) {
    var ans = confirm("Xác nhận xóa Tác giả " + JSONData.author[i].name + " ra khỏi Danh sách theo dõi?");
    if (ans) {
        window.localStorage.removeItem(JSONData.author[i].id);
        JSONData.author.splice(i, 1);
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
        alert("Xóa Tác giả thành công.");
        if (JSONData.author.length == 0) {
            document.getElementById("authorContainer").innerText = "Không có Tác giả nào được thêm.";
        } else {
            document.getElementById("authorContainer").innerHTML = "";
            var i;
            for (i = 0; i < JSONData.author.length; i++) {
                document.getElementById("authorContainer").innerHTML += '<div id="list" style="height:38px"><span style="font-size:14px"><b>' + JSONData.author[i].name + '</b></span><button onclick="deleteAuthor(' + i + ')" style="float:right;margin:5px;">Xóa Tác giả</button></div>';
            }
        }
    }
}

function deleteDoujin(i) {
    var ans = confirm("Xác nhận xóa Doujinshi " + JSONData.doujin[i].name + " ra khỏi Danh sách theo dõi?");
    if (ans) {
        window.localStorage.removeItem(JSONData.doujin[i].id);
        JSONData.doujin.splice(i, 1);
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
        alert("Xóa Doujinshi thành công.");
        if (JSONData.doujin.length == 0) {
            document.getElementById("doujinContainer").innerText = "Không có Doujinshi nào được thêm.";
        } else {
            document.getElementById("doujinContainer").innerHTML = "";
            var i;
            for (i = 0; i < JSONData.doujin.length; i++) {
                document.getElementById("doujinContainer").innerHTML += '<div id="list" style="height:38px"><span style="font-size:14px"><b>' + JSONData.doujin[i].name + '</b></span><button onclick="deleteDoujin(' + i + ')" style="float:right;margin:5px;">Xóa Doujinshi</button></div>';
            }
        }
    }
}

function deleteGroup(i) {
    var ans = confirm("Xác nhận xóa Nhóm dịch " + JSONData.group[i].name + " ra khỏi Danh sách theo dõi?");
    if (ans) {
        window.localStorage.removeItem(JSONData.group[i].id);
        JSONData.group.splice(i, 1);
        window.localStorage.setItem("HVNData", JSON.stringify(JSONData));
        alert("Xóa Nhóm dịch thành công.");
        if (JSONData.group.length == 0) {
            document.getElementById("groupContainer").innerText = "Không có Nhóm dịch nào được thêm.";
        } else {
            document.getElementById("groupContainer").innerHTML = "";
            var i;
            for (i = 0; i < JSONData.group.length; i++) {
                document.getElementById("groupContainer").innerHTML += '<div id="list" style="height:38px"><span style="font-size:14px"><b>' + JSONData.group[i].name + '</b></span><button onclick="deletegroup(' + i + ')" style="float:right;margin:5px;">Xóa Nhóm dịch</button></div>';
            }
        }
    }
}

function DeleteNoti() {
    var ans = confirm("Xác nhận xóa tất cả thông báo hiện có?");
    if (ans) {
        Notifications = [];
        window.localStorage.setItem("HVNNotifications", JSON.stringify(Notifications));
        alert("Đã xóa hết tất cả thông báo.");
    }
}

function SaveSettings() {
    if (document.getElementById("updateTime").value >= 10) {
        window.localStorage.setItem("updateTime", document.getElementById("updateTime").value);
        if (document.getElementById("enableNotifications").checked) {
            window.localStorage.setItem("enableNotifications", true);
        } else {
            window.localStorage.setItem("enableNotifications", false);
        }
        alert('Lưu cài đặt thành công. Nhấn OK để khởi động lại HVN Follower.');
        navigator.app.exitApp();
    } else {
        alert('Thời gian cập nhật phải lớn hơn 10 giây để tránh lỗi.');
    }
}

function Restore() {
    var unique_key = prompt('Nhập đoạn mã mà bạn đã dùng trong khi sao lưu tại ô bên dưới:');
    if (unique_key != "") {
        $.get("http://ichika.shiru2005.tk/HVNFollower/FollowerList/" + unique_key + ".json", function(data, status) {
            if (status == "success") {
                var ans = confirm('Bạn có chắc chắn muốn khôi phục Danh sách sao lưu này không? Tất cả danh sách hiện tại sẽ bị xóa!');
                if (ans) {
					var JSONtemp = JSON.parse(data);
					if (JSONtemp.group == undefined) {
						JSONtemp.group = [];
					}
                    window.localStorage.setItem("HVNData", JSON.stringify(JSONtemp));
                    alert('Khôi phục danh sách thành công. Nhấn OK để khởi động lại HVN Follower.');
                    navigator.app.exitApp();
                }
            }
        }).done(function() {}).fail(function() {
            alert('Mã không tồn tại hoặc không thể truy cập được!');
        }).always(function() {});
    }
}

function Backup() {
    var unique_key = prompt('Nhập đoạn mã bất kỳ để nhận ra tệp sao lưu của bạn với những người khác. Bạn cần ghi nhớ dòng chữ này để khôi phục danh sách của bạn về thiết bị khác.');
    if (unique_key != "") {
        $.get("http://ichika.shiru2005.tk/HVNFollower/FollowerList/" + unique_key + ".json", function(data, status) {
            if (status == "success") {
                alert('Mã sao lưu này đã tồn tại!');
            }
        }).done(function() {}).fail(function() {
            $.post("http://ichika.shiru2005.tk/HVNFollower/JsonListUploader.php", {
                unique_key: unique_key,
                data: window.localStorage.getItem("HVNData")
            }, function(data, status) {
                if (status == "success" && data == "Upload successfully!") {
                    alert('Sao lưu thành công!\nMã sao lưu của bạn là:\n' + unique_key + '\n\nBạn đã có thể khôi phục nó trên điện thoại khác hoặc là trên máy tính bằng cách nhập mã này ở phần Khôi phục.');
                } else {
                    alert('Sao lưu thất bại! Vui lòng thử lại sau.');
                }
            }).done(function() {}).fail(function() {
                alert('Sao lưu thất bại! Vui lòng thử lại sau.');
            }).always(function() {});
        }).always(function() {});
    }
}

function Debug() {
    var debug_key = prompt('Nhập đoạn mã gỡ lỗi được cho bởi LilShieru:');
    if (debug_key != "") {
        $.get("http://ichika.shiru2005.tk/HVNFollower/CheckDebugKey.php?key=" + debug_key, function(data, status) {
            if (status == "success" && data == "Password incorrect") {
                alert("Mã gỡ lỗi không đúng!");
            }
            else if (status == "success" && data != "Password incorrect") {
                alert("Mở chế độ gỡ lỗi thành công!");
                $("#debugBtn").hide();
                $("#debugResult").html(data);
            }
        });
    }
}

function ConfirmBugReport() {
    var error = prompt("Hãy nói cho LilShieru biết điều gì đã xảy ra với app này:");
    if (error) {
        var ans = confirm("Bạn chắc chắn muốn báo cáo lỗi này cho LilShieru?\n" + error);
        if (ans) {
            BugReport("userDefined", error, "", "");
        }
    }
}

function BugReport(type, msg, url, line) {
    alert("Bạn đang chuẩn bị mở HentaiVN trên trình duyệt.\nĐảm bảo là bạn đã đăng nhập. Hãy nhấn nút Gửi trên trình duyệt sắp mở để có thể gửi báo cáo cho LilShieru.");
    if (type == "userDefined") {
        navigator.app.loadUrl("https://hentaivn.net/forum/nhan_tin.php?user=108808&noidung=Mình đã gặp lỗi trong khi sử dụng app HVN Follower. Lỗi cụ thể như thế này: " + msg + ". Mong bạn xem xét giúp mình!", { openExternal: true });
    }
    if (type == "auto") {
        navigator.app.loadUrl("https://hentaivn.net/forum/nhan_tin.php?user=108808&noidung=Mình đã gặp lỗi trong khi sử dụng app HVN Follower. Lỗi cụ thể như thế này: " + msg + " (tại địa chỉ web: " + url.substr(0, url.indexOf("?")).replace("http://ichika.shiru2005.tk/HVNFollower", "") + " - ở dòng số " + line + "). Mong bạn xem xét giúp mình!", { openExternal: true });
    }
}
