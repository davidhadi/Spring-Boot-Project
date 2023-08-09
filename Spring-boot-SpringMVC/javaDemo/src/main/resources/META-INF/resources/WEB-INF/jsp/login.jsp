<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>login page</title>
    <link href="webjars/bootstrap/5.1.3/css/bootstrap.min.css" rel="stylesheet" >
</head>
<body>
<div class="container">
    welcome to login page !
    ${errorMessage}
    <h2>Login Form</h2>
    <form method="post">
        <input type="text" name="name" placeholder="Enter your name.!">
        <input type="password" name="password" placeholder="Enter your Password">
        <input type="submit" class="btn btn-success">
    </form>
</div>
</body>
</html>