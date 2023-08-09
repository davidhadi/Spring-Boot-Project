<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>Welcome Page</title>
    <link href="webjars/bootstrap/5.1.3/css/bootstrap.min.css" rel="stylesheet" >

</head>
<body>
<div class="container">
    welcome to  ${name}
    <hr>
    <form method="post">
        <label>Id</label>
        <input type="text", name="id">

        <label>Description</label>
        <input type="text", name="description">

        <label>Username</label>
        <input type="text", name="username">

        <label>Complete</label>
        <input type="text", name="done">

        <button type="submit" name="btn btn-success">Submit</button>
    </form>
</div>
</body>
<script src="webjars/bootstrap/5.1.3/js/bootstrap.min.js"></script>
<script src="webjars/jquery/3.6.0/jquery.min.js"></script>
</html>