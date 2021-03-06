const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title,url,techs} = request.body;
  const repository  = {
    id:uuid(),
    title,
    url,
    techs,
    likes :0
  }
  repositories.push(repository);
  response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  repositoryIndex = repositories.findIndex(repository=>repository.id === id);
  
  if(repositoryIndex < 0 ){
    return response.status(400).json({"error":"Repository not found"});
  }

  const {title,url,techs} = request.body;

  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].techs = techs;
  
  return response.json(repositories[repositoryIndex]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  repositoryIndex = repositories.findIndex(repository=>repository.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({"error":"Repository not found"});
  }

  repositories.splice(repositoryIndex,1);

  return response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  repositoryIndex = repositories.findIndex(repository=>repository.id===id);

  if(repositoryIndex < 0 ){
    return response.status(400).json({'error':"Repository not found"})
  }

  repositories[repositoryIndex].likes +=1;

  return response.status(200).json(repositories[repositoryIndex]);
});

module.exports = app;
