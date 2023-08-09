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
    <table class="table">
       <thead>
           <tr>
               <th>ID</th>
               <th>Username</th>
               <th>Description</th>
               <th>Duration</th>
               <th>Completed</th>
               <th>Delete</th>
               <th>Update</th>
           </tr>
       </thead>
        <tbody>
          <c:forEach items="${todos}" var="todos">
              <tr>
                  <td>${todos.id}</td>
                  <td>${todos.username}</td>
                  <td>${todos.description}</td>
                  <td>${todos.targetDate}</td>
                  <td>${todos.done}</td>
                  <td><a href="deletetodo?id=${todos.id}" class="btn btn-success">Delete</a></td>
                  <td><a href="update_todo?id=${todos.id}" class="btn btn-warning">Update</a></td>
              </tr>
          </c:forEach>
        </tbody>
    </table>
    <a href="addtodo" class="btn btn-success">Add Todo</a>
</div>
</body>
<script src="webjars/bootstrap/5.1.3/js/bootstrap.min.js"></script>
<script src="webjars/jquery/3.6.0/jquery.min.js"></script>
</html>