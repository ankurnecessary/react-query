// searchTerm is the actual parameter of this function. 
// In react-query we pass parameters in the following way.
export async function fetchEvents({signal, searchTerm}) {
  let url = 'http://localhost:3000/events';
  console.log(searchTerm);
  if(searchTerm) url += '?search=' + searchTerm;

  const response = await fetch(url, {signal});

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch('http://localhost:3000/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-type': 'application/json'
    }
  });

  if(!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.message = (await response.json()).message;
    throw error;
  }

  const {event} = await response.json();

  return event;
}
