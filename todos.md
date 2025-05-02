- [x] add versions to the user cars and also ai responses
- [x] add a button to the forms to generate the analysis
  - Maybe not a good idea, the analysis should be generated from the my-car
    page.
- [ ] add the cars page as a card with information => also editing in the
      advanced mode
- [ ] working on the data grid table
- [ ] defining a proper range for the fields that we have in the advanced form
      and others
- [ ] adding a new table for the analysis to be filled with useful information
      about the car
- [ ] in the first stage i will try to ask ai to do most of the heavy lifting,
      but after a while I will have to just get some properties that i need and
      then calculate everything myself, and also maybe as for another car in the
      same price range and compare them
- [ ] fix the issue with the model and year fields that behave weirdly in case
      we are in a fresh form
- [ ] incrementing the version of the user car each time that there is an update
      operation
- [ ] I added a function and trigger to update the last_ai_response_id field of
      the user_cars to be the latest possible item from ai_responses with the
      car_id equal to the user_car.id
- [ ] to add a new field to the user_cars table to make sure that they are not
      trying to make multiple saves and requests to the ai and we wont get
      charged much.
- [ ] to separate the filling of the user_cars table and the analysis calls, so
      that by the time that we want to generate the analysis, we already have
      the user_cars info
- [ ] instead of immediately saving all information that we get from the open ai
      completion, i should show a message on frontend that would show the values
      that are received and if the user is fine with them, and if so, then we
      save them again or they choose to update it.
- [ ] find a way to make the AI suggestions more consistent. (Probably not
      possible due to the nature of the AI)
- [ ] add the manual or automatic transmission part to the car details
- [ ] add a feature to compare two user cars with each other
- [ ] the "Suggested Values for the Empty field" should only be shown for the
      specific vehicle ID's case, not for all of the cases that we open the
      advanced form.
- [ ] adding the new pages to the breadcrumb list
- [ ] adding the use config, like the default country, or the default currency,
      or the default language and sending them to the AI agent
  - [ ] changing the currency icons and calculations and other stuff based on
        the selected currency and doing the math on the runtime when showing the
        value to the user.
- [ ] adding the user settings page
- [ ] adding other languages support
- [ ] change the way the charts, especially the Radar chart works. now its
      wrong, in some cases it should show the ones with lower cost as better,
      but it shows the ones with higher cost as better now.
- [ ] edit the ai analysis response message generation as well.
- [ ] the analysis overview component in the dashboard main page does not show
      the correct data (the supabase query is wrong)
- [ ] Change the server side pages to client side and create hooks to make
      supabase queries so that we can add suspense and skeletons and loading
      stages to the page.
- [ ] Add a comparison possiblity to choose cars they want and compare them
      - [ ] add a new table to store the comparison data
      - [ ] add a new page to show the comparison
      - [ ] in the comparison page, give users the ability to add or remove cars
      - [ ] in the comparison page, give users the ability to equilize the terms and situations of each car and then get a new analysis (interest rate, loan term, etc.)
- [ ] use the following loading indicator with multiple steps for the ai generation parts:
  https://ui.aceternity.com/components/multi-step-loader
- [ ] fix the issue in the simple form that requires two times submitting for the react hook form to identify the changes and to recognize the last step (onSubmit)
- [ ] Add the ability to choose two or more cars and compare their stats with each other
