# The Reckoning Challenge


This is the internship programming challenge for Reckoning Systems. Reckoning System is a software company that researches and develops proprietary systems for trading and market making in decentralized financial protocols. We are looking for interns to join our growing team. The ideal candidate should have familiarity with our technical stack. To that end the programming challenge outlines core features we are looking in interns. If you want a future building on the cutting edge of quantitave finance, give the challenge a try!

The goal of this challenge is to create an interface using React that will consume the web API that we have made on our express server, which queries results from our postgresql database through the Sequelize ORM. The knowledge gained from this project would add to any student's resume. In addition, Reckoning will be offering paid internships for impressive applicant(s), who will go on to work on the whole stack of our web application, as well as work on projects for our sister company for well-being; Meta Core Health. (https://metacorehealth.com)


## Prerequisites:

Node (we're running version 14.14.0 currently)

Knowledge of the React framework, primarily we are using hooks to construct our pages but classes are also welcome (you will be able to see what both look like from the sources we give), if you aren't familiar with React yet you can find some clarification on hooks & classes at this link: 
https://medium.com/better-programming/react-hooks-vs-classes-add2676a32f2

Apart from that, a desire to make an amazing product.

You are allowed to install any packages from ```npm``` if useful. Please refrain from adding github packages directly unless it is absolutely necessary.

Please take  alook at the packages that are already installed in ```package.json```



## Help

If you've started to read and feel overwhelmed already, don't worry! We want to accept whomever has the passion to make this program no matter the starting point. As intellectuals, we know that the most qualified person isn't always the best candidate, so if you have any questions regarding the project structure send an email to submission@reckoningsystems.com, we would be happy to give some direction / clarification.


To understand the project structure better, feel free to consult the ever helpful tutorials we used when we were starting out with projects just like this! (not so long ago)

To understand the React side of things:
https://bezkoder.com/react-crud-web-api/ 
(uses classes rather than hooks)

To get an idea of what's going on at the back-end:
https://bezkoder.com/node-express-sequelize-postgresql/

Please read both of the tutorials if you are having trouble wrapping your head around how to go about creating your api requests. If you have and still are having trouble, send us an email.

In addition, the file structure of the program has been provided, you may add or change documents as you wish, the pre-made structure is just to help applicants get started faster.



## About the Project 

The team at Reckoning have made a trading system for strategies that we set to send webhooks. When these webhooks come in, our server executes trades using the ftx(for this challenge) exchange API, and saves data from these trades in our database. To visualize the information that is being stored in an easy way, we must create an interface to display information that can be requested from the server. The aim of the reckoning-challgenge is to aquire a new member of personnel that can prove that they have or can quickly gain the knowledge neccessary to create, read, update or delete (or CRUD) any information that our server allows, and display the information in a manner that is easy to access and easy to understand. Anyone interested in gaining practical data science experience is encouraged to try the challenge. 



## Specifics

For any real-time data to be displayed in the react app a websocket or similar type of connection would be necessary, so for now we will focus on the data that can simply be gotten through http/https requests. (data that we only need to get when a new page loads, or when a button is clicked, for example)

Display the information in whatever way you see fit, for other web apps we use, material-ui is used for visible components, here are links for demos and api docs;

(Buttons for example):

Demos:
https://material-ui.com/components/buttons/

(demos use react hooks rather than classes)

API doc:
https://material-ui.com/api/button/

```@material-ui/core```, ```@material-ui/lab``` and ```@material-ui/icons``` packages are already installed.

## HTTP/HTTPS requests

The following section provides understanding of our web api, we have custom handling of each endpoint by ur server, so no query strings are never used, all information that needs to be sent will be in a ```data``` json variable (see ```src/services/exchange.service.js```).

We can cover the requests we need built by steps/pages: there are 3.


### 1. Account creation and manipulation


To be able to trade, we need acccounts to trade on, for now we are using https://ftx.com.

documentation for ftx (if you're interested) https://docs.ftx.com

You don't need to go over the doc but it's important to note that on the ftx exchange one account holder can create as many sub-accounts as they want, we will refer to any master accounts as an "account", and any sub-accounts as a "subaccount". This is important as we can leverage this to run multiple strategies for a single account, with a one-to-one subaccount-to-strategy ratio.


#### Link an ftx account

The following request function is already provided in ```src/services/exchange.service.js``` as an example of what request functions should look like.

```
POST request => /exchange/link

data = {
    email: <string>,
    apiKey: <string>,
    apiSecret: <string>
}

Returns

{
    success: <boolean>,
    message: <string> //null if success is true
}
```
#### Create a subaccount for a linked account

```
POST request => /exchange/subaccount/create

data = {
    name: <string>,
    risk: <double> // a decimal denoting the percentage of this subaccounts wallet balance that will be used for trades.
}

Returns

{
    id: <integer>,
    accountUid: <string>,
    name: <string>,
    risk: <double>
}
```

#### Delete a subaccount

```
POST request => /exchange/subaccount/delete

data = {
    subaccountId: <integer>
}

Returns:

{
    success: <boolean>,
    message: <string> //null if success is true
}
```

#### Get all information for one subaccount
```
POST request => /exchange/subaccount/info

data = {
    subaccountId: <integer>
}

Returns

{
    id: <integer>,
    accountUid: <string>,
    name: <string>,
    strategyId: <integer>, //null if a strategy is not linked
    risk: <double>
}
```


#### List past trades per subaccount for one account

```
POST request => /exchange/subaccount/trades

data = {
    subaccountId: <integer>
}

Returns (array)

[
    {
        id: <integer>,
        timestamp: <integer>,   // google javascript Date.now(), convert 
                                // to readable timestamp using moment.js 
                                // and moment.tz (already installed packages)
        risk: <double>,
        direction: <string>,    // ('buy' or 'sell')
        strategyId: <integer>,
        subaccountId: <integer>,

    },
]
```


#### Get all execution errors per subaccount

```
POST request => /exchange/subaccount/errors

data = {
    subaccountId: <integer>
}

Returns (array)

[
    {
        id: <integer>,
        timestamp: <integer>,
        message: <string>,      //error message
        strategyId: <integer>,
        subaccountId, <integer>
    },
]
```


### 2. Linking accounts to strategies

Once we create a subaccount, we will need to assign a strategy to it. That way when a signal to trade comes through for that strategy, our execution system will know which subaccounts to execute trades for.


#### Get the list of strategies

Strategy specifics are handled by another app so we assume that the interface users recognize strategies by their name, (and ticker).

```
GET request => /exchange/strategies

Returns (array)

[
    {
        id: <integer>,
        name: <string>,
        ticker: <string>    // the market to trade on (ex: 'BTC-PERP')
    }
]
```

#### Get list of all subaccounts for one account

```
GET request => /exchange/subaccount/all

Returns (array)

[
    {
        id: <integer>,
        accountUid: <string>,
        name: <string>,
        strategyId: <integer>,
        risk: <double>
    }
]
```

#### Update information for a subaccount

```
POST request => /exchange/subaccount/update

data = {
    subaccountId: <integer>,
    strategyId: <integer>,
    risk: <double>
}

Returns:

{
    success: <boolean>,
    message: <string>
}
```

Note that you do not need to send both ```strategyId``` and ```risk``` attributes for the update request to work, only the attribute(s) that have been modified.

### 3. Requesting trade data at an interval.

For now, instead of pushing up trades as they occur in real-time from the server, you can create a page that makes a request every ~5 minutes and only requests data that it missed from that interval.


#### Get any trades that came through in the past n minutes

```
POST request => /exchange/live/trades

data = {
    minutes: <integer>
}

Returns (array)

[
    {
        id: <integer>,
        timestamp: <integer>,
        risk: <double>,
        direction: <string>,
        strategyId: <integer>,
        subaccountId: <integer>
    },
]
```

#### Get any execution errors that happened in the last n minutes

```
POST request => /exchange/live/errors

data = {
    minutes: <integer>
}

Returns (array)

[
    {
        id: <integer>,
        timestamp: <integer>,
        message: <string>,
        strategyId: <integer>,
        subaccountId, <integer>
    },
]
```


### 4. (Bonus) Request trade data with timestamps

As a bonus, if someone would like to get trade data for a specific day;

```
POST request => /exchange/trades/day

data = {
    day: <integer>,
    month: <integer>,
    year: <integer>,
    timezone: <string> //moment-timezone (ex: 'America/Winnipeg')
}

Returns (array)

[
    {
        id: <integer>,
        timestamp: <integer>,
        risk: <double>,
        direction: <string>,
        strategyId: <integer>,
        subaccountId: <integer>
    },
]
```

## Submission

To submit your work to us, send a zipped folder of your repository to submission@reckoningsystems.com along with a pdf of your resume and return email.
