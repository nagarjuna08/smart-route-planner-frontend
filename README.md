# Smart Route Planner
Smart Route Planner is a full-stack web application that helps users find optimized routes between locations and discover nearby places such as restaurants, hotels, fuel stations, and tourist attractions along the route.

## Features
* Find routes between source and destination
* Route optimization with intermediate stops
* Discover restaurants along the route
* Discover hotels along the route 
* Discover fuel stations along the route
* Discover tourist attractions along the route
* Interactive map visualization using Leaflet
* Responsive UI for desktop and mobile devices
* Error handling for invalid locations
* Validation for same source and destination

## Tech Stack

### Frontend

* React
* TypeScript
* React Leaflet
* CSS

### Backend

* Spring Boot
* Java 21
* Maven

### APIs

* OpenStreetMap Nominatim
* OSRM Routing Engine
* Overpass API

## Architecture

User Input → Spring Boot API → Nominatim → OSRM → Route Generation → React + Leaflet Map

## Live Demo

Frontend:
https://smart-route-planner-frontend.vercel.app/

Backend:
https://smart-route-planner-backend-kttq.onrender.com

## Future Enhancements

* Current location support
* Multiple stops
* live tracking
* Ai recommendations of places

## Author

Nagarjuna Kakunuri
