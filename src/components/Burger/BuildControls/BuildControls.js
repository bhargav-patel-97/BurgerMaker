import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import { useFlagship, HitType, EventCategory  } from '@flagship.io/react-sdk';                            // Importing the Flagship React provider: useFlagship

const controls = [
    { label: 'Tikki', type:'tikki' },
    { label: 'Cheese', type:'cheese' },
    { label: 'Onion', type:'onion' },
    { label: 'Salad', type:'salad' },
];


function BuildControls(props) {
    const { getFlag, hit: fsHit } = useFlagship()                                           // Initializing the flag
    const flag = getFlag("backgroundColor", "")
    console.log(flag);
    // const flagExists = flag.exists()
    // const flagMetadata = flag.metadata

    const handleCTAClick = () => {
        props.orderSummary()                                                               // OrderSummary Modal Function
        console.log("Order Now CTA Clicked with Order Value: " +props.price);

        flag.userExposed().then(()=>{
            fsHit.send(                                                                     // Sending Hit to Flagship
                {
                    type: HitType.TRANSACTION,
                    documentLocation: "http://localhost:3000/BurgerMaker/",
                    transactionId: "#123345",
                    affiliation: "Revenue Generated",                                       // Secondary KPI
                    currency: "CAD",
                    itemCount: 1,
                    paymentMethod: props.order,
                    totalRevenue: props.price
                },
                {
                    type: HitType.EVENT,
                    documentLocation: "http://localhost:3000/BurgerMaker/",
                    category: EventCategory.ACTION_TRACKING,
                    action: "Order Now Clicks"                                             // Primary KPI
                }
              )
    }).catch(()=>{
            console.log("Sorry, something went wrong :(")                                   // Notify error
    })
    }
        return (
            <div className={styles.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(control => (
            <BuildControl
                key={control.label}
                label={control.label}
                add={() => props.addIngredient(control.type)}
                remove={() => props.removeIngredient(control.type)}
                disabled={props.disabled[control.type]}
            />
        ))}
        <button
            className={styles.OrderButton}
            disabled={!props.orderState}
            onClick={handleCTAClick}                                                    // Order Now Click Triggers: [ Order Summary Modal & Flagship HIT ] 
            style={{
                backgroundColor: flag.getValue(),                                       // Fetching flag value
      }}>Order Now</button>
    </div>
)};

export default BuildControls;