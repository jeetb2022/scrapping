const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://www.tripadvisor.in/Hotel_Review-g295424-d10263885-Reviews-FIVE_Palm_Jumeirah_Dubai-Dubai_Emirate_of_Dubai.html';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; Pixel 3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4076.0 Mobile Safari/537.36',    
  };
  axios.get(url, { headers })
  .then((response) => {
    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      // Select all review cards using the specified data-test-target attribute
      const reviewCards = $('[data-test-target="HR_CC_CARD"]');

      // Loop through each review card and extract the desired information
      reviewCards.each((index, element) => {
        const reviewerName = $(element).find('.ui_header_link').text().trim();
        const starRatingElement =$('.ui_bubble_rating')
        const starRatingClass = starRatingElement.attr('class');
        let starRating =  'N/A';
        if(starRatingClass == 'ui_bubble_rating bubble_50') starRating =5;
        if(starRatingClass == 'ui_bubble_rating bubble_40') starRating =4;
        if(starRatingClass == 'ui_bubble_rating bubble_30') starRating =3;
        if(starRatingClass == 'ui_bubble_rating bubble_20') starRating =2;
        if(starRatingClass == 'ui_bubble_rating bubble_10') starRating =1;
        // const starRatingMatch = starRatingClass && starRatingClass.match(/bubble_(\d+)/);
        const reviewTitle = $(element).find('[data-test-target="review-title"] a span').text().trim();
        const reviewDescription = $(element).find('.QewHA span').text().trim();

        // Output the scraped data for each review
        console.log(`Review ${index + 1}:`);
        console.log(`Reviewer Name: ${reviewerName}`);
        console.log(`Star Rating: ${starRating} stars`);
        console.log(`Review Title: ${reviewTitle}`);
        console.log(`Review Description: ${reviewDescription}`);
        console.log('\n');
      });
    } else {
      console.error('Failed to fetch the web page');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  let flag=0;
  let i =10;
  let ct =2;
  while(i<1000)
  {
    // console.log(i);
    let url_new_page = `https://www.tripadvisor.in/Hotel_Review-g295424-d10263885-Reviews-or${i}-FIVE_Palm_Jumeirah_Dubai-Dubai_Emirate_of_Dubai.html#REVIEWS`
    axios.get(url_new_page, { headers })
    .then((response) => {
      if (response.status === 200) {
        const $ = cheerio.load(response.data);
  
        // Select all review cards using the specified data-test-target attribute
        const reviewCards = $('[data-test-target="HR_CC_CARD"]');
  
        // Loop through each review card and extract the desired information
        reviewCards.each((index, element) => {
          const reviewerName = $(element).find('.ui_header_link').text().trim();
          const starRatingElement =$('.ui_bubble_rating')
          const starRatingClass = starRatingElement.attr('class');
          let starRating =  'N/A';
          if(starRatingClass == 'ui_bubble_rating bubble_50') starRating =5;
          if(starRatingClass == 'ui_bubble_rating bubble_40') starRating =4;
          if(starRatingClass == 'ui_bubble_rating bubble_30') starRating =3;
          if(starRatingClass == 'ui_bubble_rating bubble_20') starRating =2;
          if(starRatingClass == 'ui_bubble_rating bubble_10') starRating =1;
          // const starRatingMatch = starRatingClass && starRatingClass.match(/bubble_(\d+)/);
          const reviewTitle = $(element).find('[data-test-target="review-title"] a span').text().trim();
          const reviewDescription = $(element).find('.QewHA span').text().trim();
  
          // Output the scraped data for each review
          console.log(`Review ${ct++}:`);
          console.log(`Reviewer Name: ${reviewerName}`);
          console.log(`Star Rating: ${starRating} stars`);
          console.log(`Review Title: ${reviewTitle}`);
          console.log(`Review Description: ${reviewDescription}`);
          console.log('\n');
        });
      } else {
        console.log("404");
flag++;        console.error('Failed to fetch the web page');
      }
    })
    .catch((error) => {
      flag++;
    });
    if(flag>0){
      break;
    }
    i+=10;
    ct++;
  }

