import React, { Component } from 'react';
import dataBase from './dataBase.json';
import SelectedItems from './selectedItems';
import AddItems from './addItemsWare.js';
import RemoveItems from './wareRemoveItems';
import CountedParts from './countedParts';


class Warehouse extends Component {
        state = {

          activeForm:  {
                        serialNumber: true,
                        dateOfProd: true,
                        brandCarSElect: true,
                        },
          search: {
                   bySerialNumber: "",
                   byDateOfProdYear: "",
                   byDateOfProdMonth: "",
                   byBrand: "",
                   byCar: ""
                  },

          selectYear: "idYear",
          selectMonth: "idMonth",
          selectBrand: "idBrand",
          selectCar: "idCar",

          searchResult: null,
          addingItem: null,
          removingItem: null,
          counterJSON: null,
          buttonIds: {
                  addButton: "addButton",
                  removeButton: "removeButton",
                  closeAddButton: "closeAddButton",
                  closeRemoveButton: "closeRemoveButton"
          },
          resultMessages: {
                            found: "",
                            didNotFound: ""
                          }        
        }  

    handleBrandSelectorOptions = () => {
       let arrayBrand = ["",];     

       for (let i = 0; i < dataBase.length; i++) {
           arrayBrand.push(dataBase[i].brand);
        };
        arrayBrand = arrayBrand.sort();
        arrayBrand = arrayBrand.filter( (el, index, arr) => {
           if ((el !== arr[index + 1]) && ([index + 1] < arr.length)) {
               return arrayBrand.push(el);
                }
           if (index == arr.length - 1) {
               return arrayBrand.push(el);           
             }                
           } 
        );
      if (this.props.selectorValues.brand !== "") {
        this.handleCarSelectorOptions();
        }    
     return arrayBrand;
                
    } 

    handleCarSelectorOptions = () => {
      let arrayCar = ["",];
      dataBase.map( item => { 
         if (item.brand == this.props.selectorValues.brand) {
             if (item.car.length == 1) {
                  arrayCar.push(item.car[0]);
                   } else { 
                           item.car.map( car => {
                           arrayCar.push(car);
                          })
                      }        
              }
          
        });

          arrayCar = arrayCar.sort();
          arrayCar = arrayCar.filter( (el, index, arr) => {
            if ((el !== arr[index + 1]) && ([index + 1] < arr.length)) {
                return arrayCar.push(el);
                }
            if (index == arr.length - 1) {
                return arrayCar.push(el);           
              }                
            } 
          );
    return arrayCar;        
    }   
     
    handleInputSerialNumber = (value) => {
          this.setState(prevState => ({
            activeForm: {...prevState.activeForm, serialNumber: true, dateOfProd: false, brandCarSElect: false}             
          }))
          if (!value) {
              this.setState(prevState => ({
                activeForm: {...prevState.activeForm, serialNumber: true, dateOfProd: true, brandCarSElect: true}
              }))
          } 
        this.setState(prevState => ({
          search: {...prevState.search, bySerialNumber: value, byDateOfProdYear: "", byDateOfProdMonth: "", byBrand: "", byCar: ""}
        }))
    }

    handleEnableingDateOfProducitonOnFocus = (condition) => {
        this.setState(prevState => ({
          activeForm: {...prevState.activeForm, serialNumber: false, dateOfProd: true, brandCarSElect: false}             
        }))       
  }

  handleEnableingDateOfProducitonOnBlur = (condition) => {

        this.setState(prevState => ({
          activeForm: {...prevState.activeForm, serialNumber: true, dateOfProd: true, brandCarSElect: true}
        }))   
    }

  handleEnableingCarOnFocus = (condition) => {
    this.setState(prevState => ({
        activeForm: {...prevState.activeForm, serialNumber: false, dateOfProd: false, brandCarSElect: true}             
      }))       
    }
 
    handleEnableingCarOnBlur = (condition) => {
        this.setState(prevState => ({
            activeForm: {...prevState.activeForm, serialNumber: true, dateOfProd: true, brandCarSElect: true}
          }))
    }  
   
  handleSearchSerialNum = () => {
   
    let searchArray = dataBase.map((item, index) => {
      if (item.serialNumber == this.state.search.bySerialNumber) {
       return (       
        <div key={index}>
          <i key={index + 1} style={{paddingLeft: 10}}>{"{"}</i>
          <p key={index + 2}><i>{'"serialNumber" : '}</i><i>{JSON.stringify(item.serialNumber)}</i>{','}</p>
          <p key={index + 3}><i>{'"dateOfProd": '}</i><i>{JSON.stringify(item.dateOfProd)}</i>{','}</p>
          <p key={index + 4}><i>{'"brand": '}</i><i>{JSON.stringify(item.brand)}</i>{','}</p>
          <p key={index + 5}><i>{'"car": '}</i><i>{JSON.stringify(item.car.map(car => {return car}))}</i>{','}</p>
          <p key={index + 6}><i>{'"basePrice": '}</i><i>{JSON.stringify(item.basePrice)}</i>{','}</p>
          <p key={index + 7}><i>{'"action": {'}</i></p>
          <p key={index + 8} style={{paddingLeft: 60}}><i>{'"startDate" : '}</i><i>{JSON.stringify(item.action.startDate)}</i>{','}</p>
          <p key={index + 9} style={{paddingLeft: 60}}><i>{'"expireDate" : '}</i><i>{JSON.stringify(item.action.expireDate)}</i>{','}</p>
          <p key={index + 10} style={{paddingLeft: 60}}><i>{'"discountPercent" : '}</i><i>{JSON.stringify(item.action.discountPercent)}</i></p>
          <i key={index + 11} style={{paddingLeft: 60}}>{"}"}</i>
          <p key={index + 12} style={{paddingLeft: 10}}>{'},'}</p>
        </div>    
       )        
      } 
   })
   searchArray = searchArray.filter(item => {
     if (item !== undefined) {
       return item;
     }
   });

  if (searchArray[0] === undefined) {
    searchArray = null;
  }
   return searchArray;
  }


    handleSearchSetStateSerialNum = () => {
      this.setState({addingItem: null});
      this.setState({removingItem: null});
      this.setState({counterJSON: null});
      this.setState(prevState => ({
        resultMessages: {...prevState.resultMessages, didNotFound: "", found: ""}
      }))

      this.handleSearchSerialNum();
      const search = this.handleSearchSerialNum();
      if (search) {
      this.setState({searchResult: search});
    

      this.setState(prevState => ({
        resultMessages: {...prevState.resultMessages, found: "Results: found " + search.length + " items", didNotFound: ""}
      }));
      } else {
        this.setState({searchResult: null});
        this.setState(prevState => ({
          resultMessages: {...prevState.resultMessages, didNotFound: "There is no search result..."}
        }))
      }
    }

  handleDateofProdSelector = (value, eventId) => {
     if (eventId == this.state.selectYear) {
       this.setState(prevState => ({
         search: {...prevState.search, bySerialNumber: "", byDateOfProdYear: value, byBrand: "", byCar: ""}
       }))
     };
     if (eventId == this.state.selectMonth) {
      this.setState(prevState => ({
        search: {...prevState.search, bySerialNumber: "", byDateOfProdMonth: value, byBrand: "", byCar: ""}
      }))
    };
  }  

  handleSearchDateofProd = () => {
      const dateOfPRod = this.state.search.byDateOfProdYear + '-' + this.state.search.byDateOfProdMonth;
      let searchArray = dataBase.map((item, index) => {
      if (item.dateOfProd == dateOfPRod) {
       return (       
        <div key={index}>
          <i key={index + 1} style={{paddingLeft: 10}}>{"{"}</i>
          <p key={index + 2}><i>{'"serialNumber" : '}</i><i>{JSON.stringify(item.serialNumber)}</i>{','}</p>
          <p key={index + 3}><i>{'"dateOfProd": '}</i><i>{JSON.stringify(item.dateOfProd)}</i>{','}</p>
          <p key={index + 4}><i>{'"brand": '}</i><i>{JSON.stringify(item.brand)}</i>{','}</p>
          <p key={index + 5}><i>{'"car": '}</i><i>{JSON.stringify(item.car.map(car => {return car}))}</i>{','}</p>
          <p key={index + 6}><i>{'"basePrice": '}</i><i>{JSON.stringify(item.basePrice)}</i>{','}</p>
          <p key={index + 7}><i>{'"action": {'}</i></p>
          <p key={index + 8} style={{paddingLeft: 60}}><i>{'"startDate" : '}</i><i>{JSON.stringify(item.action.startDate)}</i>{','}</p>
          <p key={index + 9} style={{paddingLeft: 60}}><i>{'"expireDate" : '}</i><i>{JSON.stringify(item.action.expireDate)}</i>{','}</p>
          <p key={index + 10} style={{paddingLeft: 60}}><i>{'"discountPercent" : '}</i><i>{JSON.stringify(item.action.discountPercent)}</i></p>
          <i key={index + 11} style={{paddingLeft: 60}}>{"}"}</i>
          <p key={index + 12} style={{paddingLeft: 10}}>{'},'}</p>
        </div>   
       )        
      } 
   })
   searchArray = searchArray.filter(item => {
     if (item !== undefined) {
       return item;
     }
   });

  if (searchArray[0] === undefined) {
    searchArray = null;
  }
   return searchArray;
  }

  handleSearchSetStateDateofProd = () => {
    this.setState({addingItem: null});
    this.setState({removingItem: null});
    this.setState({counterJSON: null});
    this.handleSearchDateofProd();
    this.setState(prevState => ({
      resultMessages: {...prevState.resultMessages, didNotFound: "", found: ""}
    }))
    const search = this.handleSearchDateofProd();
    if (search) {
    this.setState({searchResult: search});
 

    this.setState(prevState => ({
      resultMessages: {...prevState.resultMessages, found: "Results: found " + search.length + " items", didNotFound: ""}
    }));
    } else {
      this.setState(prevState => ({
        resultMessages: {...prevState.resultMessages, didNotFound: "There is no search result..."}
      }))
    }
  }

  handleBrandAndCarSelector = (value, eventId) => {
    if (eventId == this.state.selectBrand) {
      this.setState(prevState => ({
        search: {...prevState.search, bySerialNumber: "", byDateOfProdYear: "", byDateOfProdMonth: "", byBrand: value, byCar: ""}
      }))
    };
    if (eventId == this.state.selectCar) {
     this.setState(prevState => ({
       search: {...prevState.search, bySerialNumber: "", byDateOfProdYear: "", byDateOfProdMonth: "", byCar: value}
     }))
   };

 }  
 

 handleSearchBrandAndCar = () => {
    const brand = this.state.search.byBrand;
    const car = this.state.search.byCar;

let searchArray = dataBase.map((item, index) => {
if (((item.brand == brand) && (item.car.indexOf(car) > -1)) || ((item.brand == brand) && (car == ""))) {
 return (       
        <div key={index}>
          <i key={index + 1} style={{paddingLeft: 10}}>{"{"}</i>
          <p key={index + 2}><i>{'"serialNumber" : '}</i><i>{JSON.stringify(item.serialNumber)}</i>{','}</p>
          <p key={index + 3}><i>{'"dateOfProd": '}</i><i>{JSON.stringify(item.dateOfProd)}</i>{','}</p>
          <p key={index + 4}><i>{'"brand": '}</i><i>{JSON.stringify(item.brand)}</i>{','}</p>
          <p key={index + 5}><i>{'"car": '}</i><i>{JSON.stringify(item.car.map(car => {return car}))}</i>{','}</p>
          <p key={index + 6}><i>{'"basePrice": '}</i><i>{JSON.stringify(item.basePrice)}</i>{','}</p>
          <p key={index + 7}><i>{'"action": {'}</i></p>
          <p key={index + 8} style={{paddingLeft: 60}}><i>{'"startDate" : '}</i><i>{JSON.stringify(item.action.startDate)}</i>{','}</p>
          <p key={index + 9} style={{paddingLeft: 60}}><i>{'"expireDate" : '}</i><i>{JSON.stringify(item.action.expireDate)}</i>{','}</p>
          <p key={index + 10} style={{paddingLeft: 60}}><i>{'"discountPercent" : '}</i><i>{JSON.stringify(item.action.discountPercent)}</i></p>
          <i key={index + 11} style={{paddingLeft: 60}}>{"}"}</i>
          <p key={index + 12} style={{paddingLeft: 10}}>{'},'}</p>
        </div>   
         )        
       }
     })
    
    searchArray = searchArray.filter(item => {
      if (item !== undefined) {
      return item;
      }
     });

     if (searchArray[0] === undefined) {
     searchArray = null;
     }
     return searchArray;
   }

  handleSearchSetStateByBrandAndCar = () => {
    this.setState({addingItem: null});
    this.setState({removingItem: null});
    this.setState({counterJSON: null});
    this.setState(prevState => ({
      resultMessages: {...prevState.resultMessages, didNotFound: "", found: ""}
    }))
    this.handleSearchBrandAndCar();
    const search = this.handleSearchBrandAndCar();
    if (search) {
    this.setState({searchResult: search});
 

    this.setState(prevState => ({
      resultMessages: {...prevState.resultMessages, found: "Results: found " + search.length + " items", didNotFound: ""}
    }));
    } else {
      this.setState(prevState => ({
        resultMessages: {...prevState.resultMessages, didNotFound: "There is no search result..."}
      }))
    }
  } 

  handleClosingFunction = (value, eventId) => {
        const buttonIds = this.state.buttonIds;

        if (eventId == buttonIds.addButton) {
          this.setState({searchResult: null}); 
          this.setState({removingItem: null,});
          this.setState({addingItem: true});
          this.setState({counterJSON: null});
          this.setState(prevState => ({
            resultMessages: {...prevState.resultMessages, didNotFound: "", found: ""}  
          }));
        }

        if (eventId == buttonIds.closeAddButton) {
          this.setState({addingItem: null});
        }

        if (eventId == buttonIds.removeButton) {
          this.setState({searchResult: null}); 
          this.setState({addingItem: null});
          this.setState({removingItem: true});
          this.setState({counterJSON: null});
          this.setState(prevState => ({
            resultMessages: {...prevState.resultMessages, didNotFound: "", found: ""}  
        }));
        }

        if (eventId == buttonIds.closeRemoveButton) {
          this.setState({removingItem: null});
        }
      }

    handleCountedParts = () => {

      let arrayCount =[];
      for (let i = 0; i < dataBase.length; i++) {
          for (let j = 0; j < dataBase[i].car.length;  j++) {
              arrayCount.push(dataBase[i].car[j]); 
          }
      }

      arrayCount.sort();

      const partCounts = arrayCount.reduce(function(accum, cur) {
          accum[cur] = (accum[cur] || 0) + 1;
          return accum;
        }, {});

      let reduceDupliArrayCount = arrayCount.reduce((accum, currVal) => {
          if (accum.indexOf(currVal) == -1) {
              accum.push(currVal);
          }
          return accum;
      }, [])

      let arrayCars = reduceDupliArrayCount;
      
      let arrayBrands = arrayCars.map(car => {
          for (let i = 0; i < dataBase.length; i++) {

              if (dataBase[i].car.indexOf(car) > -1) {
                 return dataBase[i].brand;
              }
          }
      })

      const objCarBrand = {};
      arrayCars.forEach((key, i) => objCarBrand[key] = arrayBrands[i]);

      let count = [];
      for (let props in partCounts) {
          count.push(partCounts[props]);
      }
     
      let counterJSON = arrayCars.map((car, index) => {

          return (

          <div key={index}>
              <i style={{paddingLeft: 10}}>{"{"}</i>
              <p><i>{'"brand_and_automobile"'}</i><i>{JSON.stringify(arrayBrands[index] + " " + car)}</i>{','}</p>
              <p><i>{'"count": '}</i><i>{count[index]}</i>{','}</p>
              <p style={{paddingLeft: 10}}>{'},'}</p>
          </div>
          )
      })
      this.setState({counterJSON: counterJSON});
      this.setState({searchResult: null});
      this.setState({addingItem: null});
      this.setState({removingItem: null});

  }

    render() { 
        return (
            <>
<div className="warehouse-main">
    <button onClick={() => this.props.logout()} className="logout-button">Logout</button>
    <h1>Warehouse</h1>
    <div>
        <label htmlFor="serial-number">Serial number:</label><br></br>
        <input type="text" id="serial-number" placeholder="enter serial number..." 
        onChange={(e) => this.handleInputSerialNumber(e.target.value)}
        disabled={this.state.activeForm.serialNumber ? undefined : "disabled"}

        /> 
        <button 
        disabled={this.state.activeForm.serialNumber ? undefined : "disabled"} 
        onClick={() => this.handleSearchSetStateSerialNum()}>Search item
        </button><br></br> 
        <label htmlFor="">Date of production:</label><br></br>
        <select id={this.state.selectYear} className="warehouse-year-select" required disabled={this.state.activeForm.dateOfProd ? undefined : "disabled"}
                onFocus={(e) => this.handleEnableingDateOfProducitonOnFocus(e.target.value)}
                onBlur={(e) => this.handleEnableingDateOfProducitonOnBlur(e.target.value)}
                onChange={(e) => this.handleDateofProdSelector(e.target.value, e.target.id)}
        >
          
        <option value=""></option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        </select>
        <span>/</span>
        <select id={this.state.selectMonth} required className="warehouse-month-select" 
            disabled={this.state.activeForm.dateOfProd ? undefined : "disabled"}
            onFocus={(e) => this.handleEnableingDateOfProducitonOnFocus(e.target.value)}
            onBlur={(e) => this.handleEnableingDateOfProducitonOnBlur(e.target.value)}
            onChange={(e) => this.handleDateofProdSelector(e.target.value, e.target.id)}           
        >
        <option value=""></option>
        <option value="01">1</option>
        <option value="02">2</option>
        <option value="03">3</option>
        <option value="04">4</option>
        <option value="05">5</option>            
        <option value="06">6</option>
        <option value="07">7</option>
        <option value="08">8</option>
        <option value="09">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        </select>
        <button onClick={() => this.handleSearchSetStateDateofProd()}>Search item</button><br></br> 
        <div className="form">
            <label htmlFor="">Brand and car:</label><br></br>
            <select id={this.state.selectBrand} className="warehouse-brand-select"
            onFocus={(e) => this.handleEnableingCarOnFocus(e.target.value)}
            onBlur={(e) => this.handleEnableingCarOnBlur(e.target.value)}
            onChange={(e) => {this.props.brandSelector(e.target.value); this.handleBrandAndCarSelector(e.target.value, e.target.id)}}
            disabled={this.state.activeForm.brandCarSElect ? undefined : "disabled"}
                                                              
            >
            {this.handleBrandSelectorOptions().map((brand, index) =>
                <option key={index} value={brand}>{brand}</option>   
                    )}            
            </select> 

            <select id={this.state.selectCar} value={this.state.search.byCar} className="warehouse-car-select" 
            onFocus={(e) => this.handleEnableingCarOnFocus(e.target.value)}
            onBlur={(e) => this.handleEnableingCarOnBlur(e.target.value)}
            disabled={this.state.activeForm.brandCarSElect ? undefined : "disabled"}
            onChange={(e) => this.handleBrandAndCarSelector(e.target.value, e.target.id)}    
            >
            {this.handleCarSelectorOptions().map((car, index) =>
                <option key={index} value={car}>{car}</option>
            )}    
            </select>       

            <button className="btn-brand" onClick={() => this.handleSearchSetStateByBrandAndCar()} >Search item</button><br></br> 
          </div>
          <div className="warehouse-btns"> 
            <button onClick={() => this.handleCountedParts()}>List of parts</button>
            <button id={this.state.buttonIds.addButton} onClick={(e) => this.handleClosingFunction(e.target.value, e.target.id)}>Add items</button>
            <button id={this.state.buttonIds.removeButton} onClick={(e) => this.handleClosingFunction(e.target.value, e.target.id)}>Remove items</button>
          </div>
          <h3>{this.state.resultMessages.found}</h3>  
          <h3>{this.state.resultMessages.didNotFound}</h3>
          
             
     </div>

     {this.state.searchResult ? 
     (<SelectedItems
     search={this.state.search}
     searchResult={this.state.searchResult}
     />) : null}

      {this.state.addingItem ?
     (<AddItems
      handleClosingFunction={this.handleClosingFunction}
      buttonIds={this.state.buttonIds} 
     />) : null}
    
    {this.state.removingItem ?
    (<RemoveItems
    buttonIds={this.state.buttonIds}
    handleClosingFunction={this.handleClosingFunction} 
    />) : null}

    {this.state.counterJSON ?
    <CountedParts
    counterJSON={this.state.counterJSON} 
    /> : null}
  
  </div>

  </>
  );
  }
}
 
export default Warehouse;