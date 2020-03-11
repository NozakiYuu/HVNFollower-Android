<?php
if ($_GET["key"]) {
    // Set the DebugKey here
    $debugKey = "password";
    if ($_GET["key"] == $debugKey) {
        echo '
            <div id="debugMenu"><a href="#" onclick="GetLocalStorage()" id="editBtn">Sửa đổi dữ liệu bên trong app</a><br><br>
            <div id="localStorage"></div><br>
            <a href="#" onclick="(function () { var script = document.createElement(\'script\'); script.src=\'http://cdn.jsdelivr.net/npm/eruda\'; document.body.appendChild(script); script.onload = function () { eruda.init() } })();">Bật chế độ Kiểm tra phần tử</a>
            </div>
            <script>
                function GetLocalStorage() {
                    var html = "";
                    for (var i = 0; i < window.localStorage.length; i++){
                        html += window.localStorage.key(i) + ":<br>";
                        html += "<input id=\"" + window.localStorage.key(i) + "\" value=\'" + window.localStorage.getItem(window.localStorage.key(i)) + "\' style=\"width:50%;height:40px\" /> <button onclick=\"SaveLocalStorage(\'" + window.localStorage.key(i) + "\')\" style=\"width:20%;height:40px\">Lưu lại</button> <button onclick=\"DeleteLocalStorage(\'" + window.localStorage.key(i) + "\')\" style=\"width:20%;height:40px\">Xóa</button><br>";
                        document.getElementById("localStorage").innerHTML = html;
                        document.getElementById("editBtn").innerHTML = "Làm mới lại dữ liệu bên trong app";
                    }
                }
                function SaveLocalStorage(key) {
                    window.localStorage.setItem(key, document.getElementById(key).value);
                    alert("Lưu lại dữ liệu trên biến " + key + " thành công.");
                    var html = "";
                    for (var i = 0; i < window.localStorage.length; i++){
                        html += window.localStorage.key(i) + ":<br>";
                        html += "<input id=\"" + window.localStorage.key(i) + "\" value=\'" + window.localStorage.getItem(window.localStorage.key(i)) + "\' style=\"width:50%;height:40px\" /> <button onclick=\"SaveLocalStorage(\'" + window.localStorage.key(i) + "\')\" style=\"width:20%;height:40px\">Lưu lại</button> <button onclick=\"DeleteLocalStorage(\'" + window.localStorage.key(i) + "\')\" style=\"width:20%;height:40px\">Xóa</button><br>";
                        document.getElementById("localStorage").innerHTML = html;
                    }
                }
                function DeleteLocalStorage(key) {
                    var ans = confirm("Bạn chắc chắn muốn xóa biến \'" + key + "\' chứ?");
                    if (ans) {
                        window.localStorage.removeItem(key);
                        alert("Xóa biến " + key + " thành công.");
                        var html = "";
                        for (var i = 0; i < window.localStorage.length; i++){
                            html += window.localStorage.key(i) + ":<br>";
                            html += "<input id=\"" + window.localStorage.key(i) + "\" value=\'" + window.localStorage.getItem(window.localStorage.key(i)) + "\' style=\"width:50%;height:40px\" /> <button onclick=\"SaveLocalStorage(\'" + window.localStorage.key(i) + "\')\" style=\"width:20%;height:40px\">Lưu lại</button> <button onclick=\"DeleteLocalStorage(\'" + window.localStorage.key(i) + "\')\" style=\"width:20%;height:40px\">Xóa</button><br>";
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
