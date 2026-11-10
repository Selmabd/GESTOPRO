import express from "express";
import 'dotenv/config';
const app = express();
app.use(express.json());

let projects = [
    {id: 1, nom : "Site Vitrine" ,termine: false},
    {id: 2, nom : "App Mobile" ,termine: true}
]

app.get("/", (req, res) => {
    res.json({ message: "Gestopro V1" });
});
app.get("/projects" , (req, res) => {
    res.status(200).json(projects);
})
app.get("/projects/:id", (req,res) => {
    const{id} = req.params;
    const project = projects.find(p => p.id === Number(id));
    if(!project) res.status(404).json({message : "Project not found"});
    res.json(project) 
})
app.post("/projects" , (req, res) =>{
    const { nom } = req.body;
    if(!nom) res.status(400).json({message : "Nom is required"})
    const newProject = { id: projects.length + 1, nom, termine: false}
    projects.push(newProject)
    res.status(201).json(newProject)
})
app.delete("/projects/:id", (req, res) => {
    const { id } = req.params;
    const projectIndex = projects.find(p => p.id === Number(id));
    if (!projectIndex)  {
        return res.status(404).json({ message: "Project not found" });
    }
    const deletedProject = projects.splice(projectIndex, 1);
    res.json({ message: "Project deleted", project: deletedProject[0] });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


