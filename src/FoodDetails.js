import React from 'react';
import foodBase from './database'

for (var i = 0; i < foodBase.length; i++) {
    if (foodBase[i].name === 'brokuł') {
        var uidOfProduct = foodBase[i].uid
        var categoryOfProduct = foodBase[i].category
        var energyOfProduct = foodBase[i].energy
        var proteinOfProduct = foodBase[i].protein
        var fatOfProduct = foodBase[i].fat
        var carbohydrateOfProduct = foodBase[i].carbohydrate
        var sugarsOfProduct = foodBase[i].sugars
        var photoOfProduct = foodBase[i].photo
    }
}

const FoodDetails = () => (
    <div>
        <h2>Details of PRODUCT NAME</h2>
        <p>
            uid: {uidOfProduct}<br/>
            category: {categoryOfProduct}<br/>
            energy: {energyOfProduct}<br/>
            protein: {proteinOfProduct}<br/>
            fat: {fatOfProduct}<br/>
            carbohydrate: {carbohydrateOfProduct}<br/>
            sugars: {sugarsOfProduct}<br/>
            photo: {photoOfProduct}
        </p>
    </div>
)
export default FoodDetails