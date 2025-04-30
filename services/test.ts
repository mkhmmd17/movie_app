const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODJhM2I0ZDE0OGY4YzhhYzEyOTRjZWM4NjYxYjI1OSIsIm5iZiI6MTYyNDMwMTY4My4wNiwic3ViIjoiNjBkMGUwNzMxMjc3NzgwMDJkMTBiMWE4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9._ZGYNjdBOlWYsjtdlDJR6K2uaRbjGlR4m1Gwqbj0mes'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err));