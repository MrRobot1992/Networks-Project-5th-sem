var express = require('express');
var path = require('path');
var app = express(); 
var fs = require('fs');
const { MongoClient } = require('mongodb');
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'MyDB';


const session = require('express-session');
const insertInitialDestinations = async () => {
  const client = new MongoClient(mongoUrl);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const destinationsCollection = db.collection('Destinations');
    const existingDestinations = await destinationsCollection.countDocuments();
    //el insertions
    if (existingDestinations === 0) {
      const initialDestinations = [
        {
          name: 'Paris',
        },
        {
          name: 'Annapurna',
        },
        {
          name: 'Bali',
        },
        {
          name: 'Inca',
        },
        {
          name: 'Rome',
        },
        {
          name: 'Santorini',
        }
      ];
      const result = await destinationsCollection.insertMany(initialDestinations);
      console.log(`${result.insertedCount} destinations inserted successfully`);
    } else {
      console.log('destinations already exist in DB');
    }
  } catch (error) {
    console.error('Error inserting initial destinations:', error);
  } finally {
    await client.close();
  }
};
const startServer = async () => {
  try {
    await insertInitialDestinations();
    
    app.listen(3000, () => {
      console.log("app listening");
      console.log("Initial destinations checked/inserted");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();


app.use(session({
  secret: 'your-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('login');

});

app.get('/registration', function (req, res) {
  res.render('registration');
});

app.get('/home', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('home');
});

app.get('/hiking', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('hiking');
});

app.get('/cities', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('cities');
});

app.get('/islands', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('islands');
});

app.get('/annapurna', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('annapurna');
});

app.get('/bali', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('bali');
});

app.get('/inca', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('inca');
});

app.get('/rome', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('rome');
});

app.get('/santorini', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('santorini');
});

app.get('/paris', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('paris');
});


// want to go stuff

app.post('/paris-add-to-wanttogo', async (req, res) => {
  const { destination } = req.body;
  const username = req.session.username; 
  if (!username) {
    return res.redirect('/'); 
  }

  if (!destination) {
    return res.status(400).send('Destination is required.');
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const user = await db.collection('Users').findOne({ username: username });

    if (user && user.wantToGoList && user.wantToGoList.includes(destination)) {
      return res.redirect('/paris?error=already-exist');
    }
    await usersCollection.updateOne(
      { username: username },
      { $addToSet: { wantToGoList: destination } } 
    );
    
    return res.redirect('/paris?error=destination-added');
  } catch (error) {
    console.error('Error adding to want-to-go list:', error);
    res.status(500).send('Failed to add destination.');
  } finally {
    await client.close();
  }
});

app.post('/annapurna-add-to-wanttogo', async (req, res) => {
  const { destination } = req.body;
  const username = req.session.username; 
  if (!username) {
    return res.redirect('/'); 
  }

  if (!destination) {
    return res.status(400).send('Destination is required.');
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const user = await db.collection('Users').findOne({ username: username });

    if (user && user.wantToGoList && user.wantToGoList.includes(destination)) {
      return res.redirect('/annapurna?error=already-exist');
    }
    await usersCollection.updateOne(
      { username: username },
      { $addToSet: { wantToGoList: destination } } 
    );
    
    return res.redirect('/annapurna?error=destination-added');
  } catch (error) {
    console.error('Error adding to want-to-go list:', error);
    res.status(500).send('Failed to add destination.');
  } finally {
    await client.close();
  }
});

app.post('/bali-add-to-wanttogo', async (req, res) => {
  const { destination } = req.body;
  const username = req.session.username; 

  if (!username) {
    return res.redirect('/'); 
  }

  if (!destination) {
    return res.status(400).send('Destination is required.');
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const user = await db.collection('Users').findOne({ username: username });

    if (user && user.wantToGoList && user.wantToGoList.includes(destination)) {
      return res.redirect('/bali?error=already-exist');
    }
    await usersCollection.updateOne(
      { username: username },
      { $addToSet: { wantToGoList: destination } } 
    );
    
    return res.redirect('/bali?error=destination-added');
  } catch (error) {
    console.error('Error adding to want-to-go list:', error);
    res.status(500).send('Failed to add destination.');
  } finally {
    await client.close();
  }
});

app.post('/inca-add-to-wanttogo', async (req, res) => {
  const { destination } = req.body;
  const username = req.session.username; 

  if (!username) {
    return res.redirect('/'); 
  }

  if (!destination) {
    return res.status(400).send('Destination is required.');
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const user = await db.collection('Users').findOne({ username: username });

    if (user && user.wantToGoList && user.wantToGoList.includes(destination)) {
      return res.redirect('/inca?error=already-exist');
    }
    await usersCollection.updateOne(
      { username: username },
      { $addToSet: { wantToGoList: destination } } 
    );
    
    return res.redirect('/inca?error=destination-added');
  } catch (error) {
    console.error('Error adding to want-to-go list:', error);
    res.status(500).send('Failed to add destination.');
  } finally {
    await client.close();
  }
});

app.post('/rome-add-to-wanttogo', async (req, res) => {
  const { destination } = req.body;
  const username = req.session.username; 

  if (!username) {
    return res.redirect('/'); 
  }

  if (!destination) {
    return res.status(400).send('Destination is required.');
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const user = await db.collection('Users').findOne({ username: username });

    if (user && user.wantToGoList && user.wantToGoList.includes(destination)) {
      return res.redirect('/rome?error=already-exist');
    }
    await usersCollection.updateOne(
      { username: username },
      { $addToSet: { wantToGoList: destination } } 
    );
    
    return res.redirect('/rome?error=destination-added');
  } catch (error) {
    console.error('Error adding to want-to-go list:', error);
    res.status(500).send('Failed to add destination.');
  } finally {
    await client.close();
  }
});

app.post('/santorini-add-to-wanttogo', async (req, res) => {
  const { destination } = req.body;
  const username = req.session.username; 

  if (!username) {
    return res.redirect('/'); 
  }

  if (!destination) {
    return res.status(400).send('Destination is required.');
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const user = await db.collection('Users').findOne({ username: username });

    if (user && user.wantToGoList && user.wantToGoList.includes(destination)) {
      return res.redirect('/santorini?error=already-exist');
    }
    await usersCollection.updateOne(
      { username: username },
      { $addToSet: { wantToGoList: destination } } 
    );
    
    return res.redirect('/santorini?error=destination-added');
  } catch (error) {
    console.error('Error adding to want-to-go list:', error);
    res.status(500).send('Failed to add destination.');
  } finally {
    await client.close();
  }
});

app.get('/wanttogo', async (req, res) => {
  const username = req.session.username; 

  if (!username) {
    return res.redirect('/'); 
  }

  const client = new MongoClient(mongoUrl);
  try {
    await client.connect();
    const db = client.db(dbName);
    const usersCollection = db.collection('Users');
    const user = await usersCollection.findOne({ username: username });

    res.render('wanttogo', {
      username: username,
      destinations: user?.wantToGoList || [] 
    });
  } catch (error) {
    console.error('Error fetching want-to-go list:', error);
    res.status(500).send('Failed to retrieve list.');
  } finally {
    await client.close();
  }
});

// login page 
app.post('/', async function (req, res) {
  const { username, password } = req.body; 
  console.log(`Username: ${username}, Password: ${password}`);

  if (!username || !password) {
    console.error("Username or password missing");
    return res.redirect('/?error=missing-fields');
  }

  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect(); 
    const db = client.db('MyDB');
    const user = await db.collection('Users').findOne({ username: username });

    if (!user) {
      console.log("User not found");
      return res.redirect('/?error=user-not-found');
    }

    if (user.password === password) {
      console.log("Login successful for user:", username);
      req.session.username = username;
      res.redirect('/home');
    } else {
      console.log("Incorrect password");
      return res.redirect('/?error=incorrect-password');
    }

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    res.status(500).send("Database connection error");
  } finally {
    await client.close(); 
  }
});


//registration page


app.post('/register', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    console.error("Username or password missing");
    return res.redirect('/registration?error=missing-fields'); 
  }
  console.log(username, password);
  const client = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db('MyDB');

    const existingUser = await db.collection('Users').findOne({ username: username });
    if (existingUser) {
      console.error("Username already exists");
      return res.redirect('/registration?error=username-taken'); 
    }
    await db.collection('Users').insertOne({ username: username, password: password });
    console.error("User registered successfully");
    return res.redirect('/?success=true');

  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).send("Database error");

  } finally {
    await client.close();
  }
});


app.post('/check-username', async function (req, res) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ exists: false, error: 'Username is required' });
  }

  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const db = client.db('MyDB');

    const existingUser = await db.collection('Users').findOne({ username: username });
    
    res.json({ exists: !!existingUser });
  } catch (err) {
    console.error("Error checking username:", err);
    res.status(500).json({ exists: false, error: 'Database error' });
  } finally {
    await client.close();
  }
});

//search 
app.get('/searchresults', function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  res.render('searchresults');
});

app.get('/searchresults', async function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  const searchQuery = req.query.search || ''; 

  if (!searchQuery.trim()) {
    return res.render('searchresults', { results: [], searchQuery });
  }

  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('MyDB');
    const results = await db.collection('Destinations').find({
      name: { $regex: searchQuery, $options: 'i' } 
    }).toArray();

    res.render('searchresults', { results, searchQuery });
  } catch (err) {
    console.error("Error fetching search results:", err);
    res.status(500).send("Error fetching search results");
  } finally {
    await client.close();
  }
});

app.post('/search', async function (req, res) {
  const username = req.session.username;
  if (!username) {
    return res.redirect('/'); 
  }
  const searchQuery = req.body.Search.trim(); 
  console.log(`Search Query: ${searchQuery}`);

  if (!searchQuery) {
    console.error("Search query is empty");
    return res.render('searchresults', { results: [], searchQuery: '', message: 'Please enter a search term.' });
  }

  const client = new MongoClient('mongodb://localhost:27017');
  try {
    await client.connect();
    const db = client.db('MyDB');
    const results = await db.collection('Destinations').find({
      name: { $regex: searchQuery, $options: 'i' } 
    }).toArray();

    console.log("Search Results:", results);

    if (results.length > 0) {
      res.render('searchresults', { results, searchQuery, message: null });
    } else {
      res.render('searchresults', { results: [], searchQuery, message: 'No destinations found.' });
    }
  } catch (err) {
    console.error("Error fetching search results:", err);
    res.status(500).send("Error fetching search results");
  } finally {
    await client.close();
  }
});



