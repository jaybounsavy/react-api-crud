import React from 'react';
import './App.css';

import House from './house';


const HOUSES_ENDPOINT = 'https://ancient-taiga-31359.herokuapp.com/api/houses';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  render() {
    const houses = this.state
      ? this.state.houses.map((house, index ) => 
        <House 
          key={index}
          data={house}
          addNewRoom={this.addNewRoom}
          deleteRoom={this.deleteRoom}  
          updateRoom={this.updateRoom}/>)
      : null;
      return (
        <div>
          {houses}
        </div>
      );
  }//end return


  componentDidMount() {
    fetch(HOUSES_ENDPOINT) 
      .then(res => res.json())
      .then(data => {
        this.setState({
          houses: data
        });
      });
  }

  deleteRoom(e, house, room ) {

    // Find the index of the room within the array
    const index = house.rooms.indexOf(room);

    // remove a house at that index
    house.rooms.splice(index, 1);


    // Call the update function
    updateHouse(house)
      .then(() => {
        this.setState(state => {
          for (let h of state.houses) {
            if (h._id === house._id ) {
              let h = house;
              break;
            }
          }
          return state;
        });
      });

      e.preventDefault();

  }//end deleteRoom


  updateRoom(e, house, room ) {

    // Find the index of the room within the array
    const index = house.rooms.indexOf(room);

    console.log ("index = " + index );
    console.log ("house = " + house );
    //console.log ("house.rooms[1] = " + house.rooms[1] );
    console.log ("house.rooms[0].name = " + house.rooms[0].name );
    console.log ("house.rooms[0].area = " + house.rooms[0].area );
    //console.log ("house.rooms[1].name = " + house.rooms[1].name );
    //console.log ("house.rooms[1].area = " + house.rooms[1].area );

    console.log ("house._id = " + house._id );


    house.rooms[1].name = "Basement";
    house.rooms[1].area = "500";

    
    //Call the update function
    updateHouse(house)
      .then(() => {
        this.setState(state => {
          for (let h of state.houses) {
            if (h._id === house._id ) {
              let h = house;
              break;
            }
          }
          return state;
        });
      });

    e.preventDefault();

  }//end updateRoom


  addNewRoom(e, house, room ) {
    house.rooms.push(room);
    updateHouse(house)
      .then(() => {
        this.setState(state => {
          for (let h of state.houses) {
            if (h._id === house._id ) {
              let h = house;
              break;
            }
          }
          return state;
        });
      });

      //e.preventDefault();

  }





}//end export



function updateHouse(house) {
  console.log("INSIDE: updateHouse() ");
  console.log( "house._id = " +  house._id );
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`,   {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(house)
  })
}


