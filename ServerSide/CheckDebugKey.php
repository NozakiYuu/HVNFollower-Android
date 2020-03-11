<?php
if ($_GET["key"]) {
    // Set the DebugKey here
    $debugKey = "password";
    if ($_GET["key"] == $debugKey) {
        echo '
            <div id="debugMenu"><a href="#" onclick="GetLocalStorage()">Sửa đổi dữ liệu bên trong app</a><br><br>
            <div id="localStorage"></div><br>
            <a href="#" onclick="(function () { var script = document.createElement(\'script\'); script.src=\'http://cdn.jsdelivr.net/npm/eruda\'; document.body.appendChild(script); script.onload = function () { eruda.init() } })();">Bật chế độ Kiểm tra phần tử</a>
            </div>
            <script>
                function GetLocalStorage() {
                    var html = "";
                    for (var i = 0; i < window.localStorage.length; i++){
                        html += window.localStorage.key(i) + ":<br>";
                        html += "<input id=\"key" + i + "\" value=\'" + window.localStorage.getItem(window.localStorage.key(i)) + "\' style=\"width:50%;height:40px\" /> <button onclick=\"SaveLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Lưu lại</button> <button onclick=\"DeleteLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Xóa</button><br>";
                        document.getElementById("localStorage").innerHTML = html;
                    }
                    window.setInterval(function() {
                        var html = "";
                        for (var i = 0; i < window.localStorage.length; i++){
                            html += window.localStorage.key(i) + ":<br>";
                            html += "<input id=\"key" + i + "\" value=\'" + window.localStorage.getItem(window.localStorage.key(i)) + "\' style=\"width:50%;height:40px\" /> <button onclick=\"SaveLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Lưu lại</button> <button onclick=\"DeleteLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Xóa</button><br>";
                            document.getElementById("localStorage").innerHTML = html;
                        }
                    }, 10000);
                }
                function SaveLocalStorage(i) {
                    window.localStorage.setItem(window.localStorage.key(i), document.getElementById("key" + i).value);
                    alert("Lưu lại dữ liệu trên biến " + window.localStorage.key(i) + " thành công.");
                    var html = "";
                    for (var i = 0; i < window.localStorage.length; i++){
                        html += window.localStorage.key(i) + ":<br>";
                        html += "<input id=\"key" + i + "\" value=\'" + window.localStorage.getItem(window.localStorage.key(i)) + "\' style=\"width:50%;height:40px\" /> <button onclick=\"SaveLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Lưu lại</button> <button onclick=\"DeleteLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Xóa</button><br>";
                        document.getElementById("localStorage").innerHTML = html;
                    }
                }
                function DeleteLocalStorage(i) {
                    var ans = confirm("Bạn chắc chắn muốn xóa biến \'" + window.localStorage.key(i) + "\' chứ?");
                    if (ans) {
                        var keyName = window.localStorage.key(i);
                        window.localStorage.removeItem(window.localStorage.key(i));
                        alert("Xóa biến " + keyName + " thành công.");
                        var html = "";
                        for (var i = 0; i < window.localStorage.length; i++){
                            html += window.localStorage.key(i) + ":<br>";
                            html += "<input id=\"key" + i + "\" value=\'" + window.localStorage.getItem(window.localStorage.key(i)) + "\' style=\"width:50%;height:40px\" /> <button onclick=\"SaveLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Lưu lại</button> <button onclick=\"DeleteLocalStorage(" + i + ")\" style=\"width:20%;height:40px\">Xóa</button><br>";
                            document.getElementById("localStorage").innerHTML = html;
                        }
                    }
                }
            </script>
        ';
    }
    else {
        echo "Password incorrect";
    }
}
else {
    echo "Password incorrect";
}
