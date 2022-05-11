# Donation App - GA Project 4

## Overview
A donation app where users can find charities, add donations and view their personal dashboard. This was a solo project and my final project in the General Assembly Software Engineering course. 

> **Duration:** 10 days \
> **Technologies:** PostgreSQL, Python, Django (Django REST framework), PyJWT (JSON Web Token), React, Axios, Bulma/SCSS

The app is deployed using Heroku and Netlify and is available here &rarr; https://donation-app-project.netlify.app/ \
[![Netlify Status](https://api.netlify.com/api/v1/badges/e73272b5-823f-436c-a2d4-6db85532f5b3/deploy-status)](https://app.netlify.com/sites/donation-app-project/deploys)

Please give it a chance to wake up as the free servers on Heroku sleep when they are not in use. 

Feel free to register your own account, or you can use email `elise@email.com` and password `password!1`.

No actual donations are made. 

## The Brief
Build a full-stack application with a Python Django API, using the Django REST Framework to serve data from a PostgreSQL database and consume the API with a separate frontend built with React.

## Approach
### Planning
I began with planning the basic functionality and drawing an entity relationship diagram (ERD) and basic wireframe for the project. 

Database ERD:

Wireframe:

### Backend
I first made a simple ‘Hello World’ Django application and deployed it to Heroku. Then, I connected the app to a PostgreSQL database. 

#### Models, URLs and Views
I created separate Django apps for donations, charities and jwt_auth and wrote the models, URLs and views for each of these. I tested each route as I went using Django’s built-in admin site and Postman. 

Single Donation Model: 
```python
class SingleDonation(models.Model):
    user = models.ForeignKey(
        User, related_name='single_donations', on_delete=models.CASCADE)
    charity = models.ForeignKey(
        Charity, related_name='single_donations', on_delete=models.SET_NULL, null=True)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)
    date = models.DateField()
```

View: 
```python
class SingleDonationListForUser(ListAPIView):
  permission_classes = [IsAuthenticated, ]

  serializer_class = PopulatedSingleDonationSerializer

  def get_queryset(self):
      user = self.request.user
      return SingleDonation.objects.filter(user=user)
```

I wrote the serializers and updated them throughout the project when needed. 

Serializer: 
```python
class SingleDonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = SingleDonation
        fields = ('__all__')
```

My database design used a many-to-many relationship between charities and categories. This is used on the frontend to filter the charities by category and display the user’s donations by category. 
```python
category = models.ManyToManyField(Category, related_name='charity', blank=True)
```

#### JWT Authentication
Following this, I added register and login functionality using JWT authentication. As my project requires users to be able to view their donation history, I used `permission_classes = (IsAuthenticated, )` to get all donations belonging to the user in the JWT payload. In addition, I wrote views to _get_, _update_ and _delete_ a single donation, ensuring that the user in the JWT payload matches the user on the donation being queried.

### Frontend
I worked on the frontend simultaneously with the backend which allowed me to make adjustments to the backend as I went, in particular to the serializers. 

#### Form Validation and Error Handling
To improve the user experience when registering and logging in, I accessed the server-side error messages from the API in the catch block and displayed these to the user. Furthermore, I built in client-side form validation to provide an initial check and display clear feedback to the user. This avoids unnecessary delays caused by sending invalid data to the server and waiting for an error response. 

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  if (formData.email === '' || formData.password === '') {
    setError('Email and password are required');
  } else {
    setError('');
    try {
      const data = await login(formData);
      setUser(getLoggedInUserId());
      navigate('/profile');
    } catch (err) {
      console.error(err);
      setResponseErrorMessage(err.response.data.message);
    }
  }
};
```

On the individual charity page, I added a donation form which prefills the current charity to be sent to the API. To guarantee that the data stored is valid I used custom validation on the backend to check that the donation amounts are greater than 0. I also added validation on the user inputs to ensure that requests are not sent to the API unless the data meets certain requirements.

Server-side validation:
```python
if single_donation_serializer.is_valid():
  if Decimal(request.data['total_amount']) <= 0:
    return Response(data={'message': 'Value must be greater than 0'}, status=status.HTTP_400_BAD_REQUEST)
  single_donation_serializer.save()
  return Response(data=single_donation_serializer.data, status=status.HTTP_201_CREATED)
```

Client-side validation:
```javascript
let messages = { total_amount: '', date: '' };
if (formData.total_amount <= 0) {
  messages = {
    ...messages,
    total_amount: 'Amount must be greater than zero',
  };
}
if (formData.total_amount === '') {
  messages = { ...messages, total_amount: 'Please enter an amount' };
}
if (formData.date === '') {
  messages = { ...messages, date: 'Please select a date' };
}
```


#### Profile
On the profile page, I used the HTML table tag to display all the donations a user has made, sorting the data by the most recent date. Here, I also had to update the donation serializer so that the charity names would be populated.

To make the profile page more visually appealing, I added a pie chart using [React Charts.js](https://react-chartjs-2.js.org/) to show the breakdown of donations by category. 

I created tabs for ‘One-off’ and ‘Monthly’ donations on the profile page but unfortunately did not have time to build monthly donations on the frontend. 

#### Logged-in State
Conditional rendering is used to display different elements based on whether the user is logged in. However, if the user logged out whilst on the homepage, the homepage did not update to show the ‘Sign up to get started’ banner. Some research led me to use context to keep track of the logged-in state across multiple components and avoid prop drilling. I found this really helpful as I could simply access the context wherever it was needed with the _useContext_ hook. 

#### Filtering Charities
On the homepage, I wanted the option to filter the charities listed by category. Given that all charities are fetched from the API on page load, it made sense to do the filtering on the frontend. I found writing this particularly rewarding as it involved creating an object containing different methods which are used based on the category button clicked. 

## Wins
Setting up the backend was surprisingly quick as Django provides a great deal of functionality out of the box. It was useful to take advantage of Django’s generic views and then use class-based views to tailor to a specific use case.

I am pleased with both the server-side and client-side form validation. 

## Future Improvements
- Build monthly donations into the frontend with the following features: 
  - Donation form with the option to select either ‘One-off’ or ‘Monthly’
  - Option to edit a monthly donation by adding an end date 
  - Display the total raised from monthly donations by calculating the number of months from the start date to now, or the end date if provided
- Paginate the table of donations when the number of donations exceeds a certain number
- Add a charity keyword search

