<h1>Kinara Capital SDE Home Assignment</h1> </br>
<h2>Objective</h2> </br>
The objective of this assignment is to develop a grid system with filtering functionality in the backend. The grid system is designed to display student details (such as ID, name, total marks, etc.)
and allow filtering based on various columns. The assignment involves developing backend APIs responsible for loading student details with pagination and implementing server-side filtering.

<h2>Requirements</h2>
<h3>Load Student Details API:</h3> Implement an API that retrieves student details from a file (CSV/JSON/any other format) and returns the data in a paginated manner. The API should accept parameters such as page number and page size to allow pagination.
<h3>Server-side Filtering API:</h3> Implement server-side filtering functionality in the backend. The filtering mechanism should allow the UI to send filter criteria to the backend API, which will then return the filtered results to the UI.

## Postman API Responses

### Success Response

#### Load Student Details API

**Request:**
``` GET  http://localhost:8800/api/students/filter?pageNumber=1&count=10 ``` </br>
**Response:**
```json
{
  "status": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "total_marks": 95
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "total_marks": 88
    },
    // Additional student details
  ]
}
```

## Failure Response
## Load Student Details API
**Request:**
```
GET http://localhost:8800/api/students/filter?pageNumber=10&count=5
```
**Response:**
```
{
  "status": false,
  "message": "Page not found"
}
```

## Server-side Filtering API
### Success Response
**Request:**
```
GET /api/students/filter?query="john"

```
**Response:**
```
{
    "status": true,
    "message": "Success",
    "data": [
        {
            "_id": "663218b2edc57a4af175740c",
            "name": "john",
            "student_class": "10",
            "roll_number": "1",
            "total_marks": 90,
            "__v": 0,
            "createdAt": "2024-05-01T10:25:54.731Z",
            "updatedAt": "2024-05-01T10:25:54.731Z"
        }
    ]
}
```
## Failure Response
## Server-side Filtering API
**Request:**
```
GET /api/students/filter?query=InvalidQuery

```
**Response:**
```
{
    "status": false,
    "message": "Data not found"
}
```

