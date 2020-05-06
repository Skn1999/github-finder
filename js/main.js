$(document).ready(function(){

    $("#username").on('keyup', function(e){
        var username = e.target.value;
        $.ajax({
            url: "https://api.github.com/users/" + username,
            data:{
                client_id: "44d5742bf3d774afb9b2",
                client_secret: "008b2202a628933199ff0d275db853c8f6dbc967"
            }
        }).done(function(user){
            $.ajax({
                url: "https://api.github.com/users/" + username + "/repos",
                data: {
                    client_id: "44d5742bf3d774afb9b2",
                    client_secret: "008b2202a628933199ff0d275db853c8f6dbc967",
                    sort: "created: asc",
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function (index, repo) { 
                    $("#repos").append(`
                        <div class="jumbotron">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${repo.name}</strong>: <div class="text-muted">${repo.description}</div>
                                </div>
                                <div class="col-md-3">
                                    <span class="badge badge-pill badge-primary">Forks: ${repo.forks_count}</span>
                                    <span class="badge badge-pill badge-secondary">Watchers: ${repo.watchers_count}</span>
                                    <span class="badge badge-pill badge-success">Stars: ${repo.stargazers_count}</span>
                                </div>
                                <div class="col-md-2">
                                    <a href=${repo.html_url} class="btn btn-info" target="_blank">Repo Page</a>
                                </div>
                            </div>
                        <div>
                    `);  
                });
            });
            $("#profile").html(
                `<div class="card border-primary mb-3">
                <div class="card-header">${user.name}</div>
                <div class="card-body">
                    <div class="container">
                        <div class="row">
                            <div class ="col-md-3">
                                <img style="width:100%" class="rounded img-thumbnail" src=${user.avatar_url}/>
                                <a href=${user.html_url} class="btn btn-primary btn-block mt-3" target="_blank">View Profile</a>
                            </div>
                            <div class ="col-md-9">
                                <span class="badge badge-pill badge-primary">Public Repos: ${user.public_repos}</span>
                                <span class="badge badge-pill badge-secondary">Public Gists: ${user.public_gists}</span>
                                <span class="badge badge-pill badge-success">Followers: ${user.followers}</span>
                                <span class="badge badge-pill badge-danger">Following: ${user.following}</span>
                                <ul class="list-group mt-3">
                                    <li class="list-group-item">Company: ${user.company}</li>
                                    <li class="list-group-item">Website/blog: ${user.blog}</li>
                                    <li class="list-group-item">Location: ${user.location}</li>
                                    <li class="list-group-item">Member since: ${new Date(user.created_at).getFullYear()}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
              <h3 class="page-header">Latest Repos</h3>
              <div id="repos"></div>
              `
            );
        });
    })
})