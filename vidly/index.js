const Joi = require('joi');
const express = require('express');
const app = express();


app.use(express.json());

const genres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Aventure' },
    { id: 3, name: 'Romantic' },
    { id: 4, name: 'Comedy' }, 
];

app.get('/', (req, res) => {
    res.send('Hello World! Building My First Web Server!!! endpoint!');
});

app.get('/api/genres', (req, res) => {
    res.send(genres);
});

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body); 
    if (error)  return res.status(400).send(error.details[0].message);
       
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.put('/api/genres/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found.');

    const { error } = validateGenre(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // Update course
    genre.name = req.body.name;
    // Return the updated course 
    res.send(genre);
});

function validateGenre(genre) {
    // Validate
    // If invalid, return 400 - Bad request
    const schema = Joi.object({
        name: Joi.string().min(4).required()
    });

    return schema.validate(genre);
}

app.delete('/api/genres/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found.');

    // Delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1); // to remove/delete an object

    // Return the same course
    res.send(genre);
})

// /api/courses/1 - Single Route Parameters
// We use route parameters for essential or required values
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The course with the given ID was not found.');
    res.send(genre);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
