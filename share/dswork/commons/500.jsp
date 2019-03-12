<%@page contentType="text/html;charset=UTF-8" isErrorPage="true"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui"/>
<title>Error</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif, 微软雅黑;
    }
</style>
</head>
<body><%String requestUri = (String) request.getAttribute("javax.servlet.error.request_uri");%>
<h1>发生错误。</h1>
<p>很抱歉，您所要的页面目前无法使用。<br/>
<%=exception.getMessage()%><br />
<button onclick="window.history.back();">返回</button></p>
<p><a href="#" onclick="document.getElementById('detail_error_msg').style.display = '';">点击此处查看错误详细</a></p>
<div id="detail_error_msg" style="display:none">
	<pre><%exception.printStackTrace(new java.io.PrintWriter(out));%></pre>
</div>
<p><em>system administrator.</em></p>
</body>
</html>
