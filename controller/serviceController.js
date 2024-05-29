const { name } = require('ejs');
const servicePlan = require ('../model/serviceModel')
const nodemailer = require('nodemailer');
const serviceModel = require('../model/serviceModel');
const puppeteer = require('puppeteer');


const serviceInsert = async (req, res) => {
    try {
        
        const insertServiceData = new servicePlan({
            name: req.body.name,
            phoneNumber: req.body.Phonenumber,
            sqfeet: req.body.sqfeet, 
            placelocation: req.body.place,
            plan: req.body.plan,
            startDate: (req.body.startDate),
            endDate: (req.body.endDate),
            comment: req.body.comment
        });

        // Save the document to the database
        await insertServiceData.save();

        // Redirect to '/data' after successful save
        res.redirect('/data');
    } catch (error) {
        console.error('Error saving service data:', error);
        res.status(500).send('Internal Server Error');
    }
};


//LOGIN START
const loginLoad = async (req, res) => {
   
    try {
        
            res.redirect('/')
            return
        
        
    } catch (error) {
        console.log(error.message)
    }
}




//DASHBOARD

const dashboard = async (req, res) => {
    try {
       
            const UsersData = await servicePlan.find({});
            res.render('dashboard', { Users: UsersData }); // Pass Users data to the dashboard template
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const userview = async (req, res) => {
    try {
        
            const servicedata = await servicePlan.find({});
            
            res.render('tables', { dataservice: servicedata });
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error'); 
    }
};

const redclient = async (req, res) => {
    try {
       
            const currentDate = new Date();
           
            const redData = await serviceModel.find({
                endDate: {
                    $lte: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000) // 5 days before current date
                }
            });
            
            res.render('red', { redData });
       
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error'); 
    }
};

const yellowclient = async (req, res) => {
    try {
       
            const currentDate = new Date();
           
            const yellowData = await serviceModel.find({
                endDate: {
                    $gt: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000), 
                    $lte: new Date(currentDate.getTime() + 25 * 24 * 60 * 60 * 1000) // 25 days before current date
                  }
            });
            
            res.render('yellow', { yellowData });
       
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error'); 
    }
};

const greenclient = async (req, res) => {
    try {
       
            const currentDate = new Date();
           
            const greenData = await serviceModel.find({
                endDate: {
                    $gt: new Date(currentDate.getTime() + 25 * 24 * 60 * 60 * 1000) 
                  }
            });
            
            res.render('green', { greenData });
       
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error'); 
    }
};



//  delete service
const deleteService = async (req, res) => {
    try {
      const deletedData = await serviceModel.findByIdAndDelete(req.params.id);
      if (!deletedData) {
        return res.status(404).send('Data not found'); // Respond with 404 if data not found
      }
      res.status(200).send('Data deleted successfully'); // Respond with success message
    } catch (error) {
      console.error('Error deleting data:', error);
      res.status(500).send('Internal Server Error');
    }
  };
  

  const serviceEdit = async (req, res) => {
    try {
      const { id, name, Phonenumber, place, plan, startDate, endDate, comment,sqfeet } = req.body;
  
      const updatedServiceData = {
        name,
        phoneNumber: Phonenumber,
        sqfeet,
        placelocation: place,
        plan,
        startDate,
        endDate,
        comment
      };
  
      // Find document by ID and update
      await serviceModel.findByIdAndUpdate(id, updatedServiceData);
  
      console.log('Edit successful');
  
      // Optionally send a response back
      res.status(200).json({ message: 'Edit successful' });
    } catch (error) {
      console.error('Error editing data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  
  
  




module.exports = {
    serviceInsert,
    
    loginLoad,
    userview,
    deleteService,
    dashboard,
    serviceEdit,
    redclient,
    greenclient,
    yellowclient,
    

}