const express = require('express');
const bodyParser = require('body-parser');
const path  = require('path')
const Student = require('./models/student.js'); // Adjust the path as needed

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')));
app.set('view engine','ejs');


app.get('/form', (req, res) => {
    res.render('form'); 
  });


// Assuming you've already established a MongoDB connection and have a Student model defined.

// Define a route to render the student details page.
app.get('/', async (req, res) => {
    try {
        // Fetch all students from the database
        const students = await Student.find();

        // Render the EJS template and pass the student data
        res.render('index', { students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/student/:id',async (req,res)=>{

    const stdid = req.params.id

    const student = await Student.findOne({stdid:stdid});
    res.render('student',{student:student})


})


app.post('/delete-student/:id',async (req,res)=>{

    const stdid = req.params.id

    const dstudent = await Student.deleteOne({stdid:stdid});
 
    if (dstudent.deletedCount === 1) {
        console.log('Student deleted successfully');
        res.redirect('/'); 
      } else {
        console.log('Student not found');
        res.status(404).send('Student not found'); 
      }
})






app.post('/',async(req,res)=>{
  
    try{
        const fname = req.body.firstName
        const lname = req.body.lastName
        const stdid= req.body.stdid
        const address = req.body.address

        const newStudent = new Student({
            firstName: fname,
            lastName: lname,
            stdid: stdid, 
            address: address});

        await newStudent.save();
        res.redirect('/')

    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).send('Internal Server Error');
      }


})


app.listen(3000,()=>{
    console.log('server is running port 3000')
})