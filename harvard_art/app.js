const BASE_URL = 'https://api.harvardartmuseums.org';
const KEY = 'apikey=c8f41b38-2106-4d1b-9598-96aea706d117'; // USE YOUR KEY HERE

function fetchObjects() {
    const url = `${ BASE_URL }/object?${ KEY }`;

    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
}

fetchObjects();

async function fetchObjects() {
    onFetchStart();
    const url = `${ BASE_URL }/object?${ KEY }`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error);
    } finally {
        onFetchEnd();
    }
  }
  
  fetchObjects().then(x => console.log(x));

  async function fetchAllCenturies() {
      onFetchStart();
    if (localStorage.getItem('centuries')) {
        return JSON.parse(localStorage.getItem('centuries'));
      }
    const url = `${ BASE_URL }/century?${ KEY }&size=100&sort=temporalorder`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const records = data.records;
  
      return records;
    } catch (error) {
      console.error(error);
    } finally {
        onFetchEnd();
    }
}

async function fetchAllClassifications() {
    onFetchStart();
    if (localStorage.getItem('classifications')) {
      return JSON.parse(localStorage.getItem('classifications'));
    }
    const url = `${ BASE_URL }/century?${ KEY }&size=100&sort=temporalorder`;

  
    try {
      const response = await fetch(`${ API.ROOT }/${ API.RESOURCES.CLASSIFICATION }?${ API.KEY }&size=100&sort=name`);
      const { info, records } = await response.json();
      localStorage.setItem('classifications', JSON.stringify(records));
  
      return records;
    } catch (error) {
      console.error(error);
    } finally {
        onFetchEnd();
    }
  }

  async function prefetchCategoryLists() {
      onFetchStart();
    try {
      const [
        classifications, centuries
      ] = await Promise.all([
        fetchAllClassifications(),
        fetchAllCenturies()
      ]);
    } catch (error) {
      console.error(error);
    } finally {
        onFetchEnd();
    }
  }

  // This provides a clue to the user, that there are items in the dropdown
$('.classification-count').text(`(${ classifications.length })`);

classifications.forEach(classification => {
    $('#select-classification')
    .append($(<option value="${classification.name}">${classification.name}</option>));
  // append a correctly formatted option tag into
  // the element with id select-classification
});

// This provides a clue to the user, that there are items in the dropdown
$('.century-count').text(`(${ centuries.length }))`);

centuries.forEach(century => {
    $('#select-century')
    .append($(<option value="${century.name}">${century.name}</option>));
  // append a correctly formatted option tag into
  // the element with id select-century
});

function buildSearchString() {
    const url = `${ BASE_URL }/object?${ KEY }`;

}

$('#search').on('submit', async function (event) {
    event.preventDefault();
    onFetchStart();
    // prevent the default
  
    try {
        const responce = await fetch(buildSearchString());
        const {records, info} = await response.json(); 
      // get the url from `buildSearchString`
      // fetch it with await, store the result
      // log out both info and records when you get them
    } catch (error) {
        console.error(error);
      // log out the error
    } finally {
        onFetchEnd();
    }
  });

  // notice the space in 'mona lisa' below
const url = 'https://api.harvardartmuseums.org?apikey=351673f0-777e-11ea-b7b8-399da107d1d6&keyword=mona lisa' 
// encode the URL
const encodedUrl = encodeURI(url); 
// now, encodedUrl will be
// 'https://api.harvardartmuseums.org?apikey=351673f0-777e-11ea-b7b8-399da107d1d6&keyword=mona%20lisa'

function onFetchStart() {
    $('#loading').addClass('active');
  }
  
  function onFetchEnd() {
    $('#loading').removeClass('active');
  }

  function renderPreview(record) {
    const {
        description,
        primaryimageurl,
        title,
      } = objectRecord;
    // grab description, primaryimageurl, and title from the record
  
    <div class="object-preview">
      <a href="#">
        <img src="image url" />
        <h3>Record Title</h3>
        <h3>Description</h3>
      </a>
    </div>
  
  
    // return new element
  }
  
  
  function updatePreview(records) {
    const root = $('#preview');

    if (info.next) {
        root.find('.next')
        .data('url', info.next)
        .attribute('disabled', true);
    } else {
        root.find('.next')
        .data('url', null)
        .attribute('disabled', true);
    }

    if (info.prev) {
        root.find('.previous')
        .data('url', info.prev)
        .attribute('disabled', false);
    } else {
        root.find('.previous')
        .data('url', null)
        .attribute('disabled', true);
      }
  
    // grab the results element, it matches .results inside root
    // empty it
    // loop over the records, and append the renderPreview
  }

  $('#preview .next, #preview .previous').on('click', async function () {
    onFetchStart();
    try {
      const url = $(this).data('url');
      const response = await fetch(url);
      const {records, info} = await response.json();  
      
    updatePreview(records, info);
} catch (error) {
      console.error(error);
    } finally {
      onFetchEnd();
    }
    /*
      read off url from the target 
      fetch the url
      read the records and info from the response.json()
      update the preview
    */
  });