import React, { useEffect, useState } from 'react';
import Card from '../components/card';
import Preface from '../components/Preface';
import Checkbox from '../components/Checkbox';
import '../styles/App.css';
import Repository from '../components/Repository';
import { getDatabase, ref, child, get, query, orderByChild } from "firebase/database";
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { createRenderer } from 'react-dom/test-utils';

const App = () => {
  const variable = "cool item";
  const title = `Random Item ${variable}`;

  const [content, setContent] = useState(false);
  const [preChk, setPreChk] = useState(false);
  const [efChk, setEfChk] = useState(false);
  const [curseChk, setCurseChk] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [item, setItem] = useState('');
  const [effect, setEffect] = useState('');
  const [curse, setCurse]= useState('');
  const [buttonLabel, setButtonLabel]= useState('Generate');

  const [listItem, updateListItem] = useState([]);
  const [typeRef, setTypeRef] = useState('');
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
 
  const randy = (max, cur) => {
    let val = Math.floor(Math.random() * max);
    if (cur === val) {
      val = randy(max, val);
    }

    return val;
   };

     // database end points
     const dbRef = ref(getDatabase());
     const getItemRef = () => {
        get(child(dbRef, `Types/`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
  
            const rand = randy(3);
            setTypeRef(snapshot.val()[rand]);
            setItemRef();   
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
      });
     }
     
     const setItemRef = () => {
       get(child(dbRef, `${typeRef}/`)).then((snapshot) => {
         if (snapshot.exists()) {
          let result = Object.keys(snapshot.val()).map(e => {
            let res = {};
            res[e] = snapshot.val()[e];
            return res;
          })
          const rand = randy(result.length);
           setItem((Object.keys(result[rand])));
          if (preChk) {
            getPrefix();
          } else {
            setPrefix(null);
          }
          if (curseChk) {
            getCurse();
          } else {
            setCurse(null);
          }
          if (efChk) {
            getEffect();
          } else {
            setEffect(null);
          }
         } else {
           console.log("no data available dog");
         }
       }).catch((error) => {
         console.error(error);
       });
     };

     const getPrefix = () => {
      get(child(dbRef, 'Prefix/')).then((snapshot) => {
        if (snapshot.exists()) {
          const snap = snapshot.val();
          let pRand = randy(snap.length);
          let allowedPrefix = snap[pRand].TypesAllowed[snap[pRand].TypesAllowed.indexOf(typeRef)];
          let allowedPrefixName; 

          if (allowedPrefix) {
            console.log(allowedPrefix);
            allowedPrefixName = snap[pRand].Title;
            setPrefix(allowedPrefixName);
          } else {
            pRand = randy(snap.length, pRand);
            allowedPrefix = snap[pRand].TypesAllowed[snap[pRand].TypesAllowed.indexOf(typeRef)];

            console.log(allowedPrefix);
            allowedPrefixName = snap[pRand].Title;
            setPrefix(allowedPrefixName);
          };
        };
      });
     };

     const getCurse = () => {
      get(child(dbRef, 'Curse/')).then((snapshot) => {
        if (snapshot.exists()) {
          const snap = snapshot.val();
          let cRand = randy(snap.length);
          let allowedCurse = snap[cRand].TypesAllowed[snap[cRand].TypesAllowed.indexOf(typeRef)];
          let allowedCurseName;

          if (allowedCurse) {
            console.log(allowedCurse);
            allowedCurseName = snap[cRand].Title;
            setCurse(allowedCurseName);
          } else {
            cRand = randy(snap.length, cRand);
            allowedCurse = snap[cRand].TypesAllowed[snap[cRand].TypesAllowed.indexOf(typeRef)];

            console.log(allowedCurse);
            allowedCurseName = snap[cRand].Title;
            setCurse(allowedCurseName);
          };
        };
      });
     };

     const getEffect = () => {
      get(child(dbRef, 'Effect/')).then((snapshot) => {
        if (snapshot.exists()) {
          const snap = snapshot.val();
          let efRand = randy(snap.length);
          let allowedEffect = snap[efRand].TypesAllowed[snap[efRand].TypesAllowed.indexOf(typeRef)];
          let allowedEffectName;

          if (allowedEffect) {
            console.log(allowedEffect);
            allowedEffectName = snap[efRand].Title;
            setEffect(allowedEffectName);
          } else {
            efRand = randy(snap.length, efRand);
            allowedEffect = snap[efRand].TypesAllowed[snap[efRand].TypesAllowed.indexOf(typeRef)];

            console.log(allowedEffect);
            allowedEffectName = snap[efRand].Title;
            setEffect(allowedEffectName);
          };
        };
      });
     };

  const onPressGenerate = () => {
    // const items = listItem;
    // setPrefix((preChk) ? 'bloody' : null);
    // setItem('sword');
    // setEffect((efChk) ? 'of the bear' : null);
    // setCurse((curseChk) ? 'haunted' : null);
    // const tmpItem = {
    //   prefix : (preChk) ? prefix : null,
    //   item : item,
    //   effect : (efChk) ? effect : null,
    //   curse : (curseChk) ? curse : null,
    // };
    // items.unshift(tmpItem);
    // updateListItem(items);
    // console.log(items);
    setButtonLabel('Generate Another');
    setContent(true);
    getItemRef();
  };

  const onPressHome = () => {
    setContent(false);
  };

  return (
    <div className="App">
     {title}
     {(content)
       ? <Card
          prefix={prefix}
          item={item}
          effect={effect}
          curse={curse}
       />
       : <Preface/>
     }
     < br />

     <button
      onClick={onPressGenerate}>
        {buttonLabel

        }
      </button>
      <button
        onClick={onPressHome}>
        Home
      </button>

      <br />

      <Checkbox 
        label="Prefix"
        value={preChk}
        onChange={(e) => {
          setPreChk(e.target.checked);
        }}
      />
      <Checkbox 
        label="Curse"
        value={curseChk}
        onChange={(e) => {
          setCurseChk(e.target.checked);
        }}
      />
      <Checkbox 
        label="Effect"
        value={efChk}
        onChange={(e) => {
          setEfChk(e.target.checked);
        }}
      />
      <Repository
        allItems={listItem}
      />
      </div>
  );
};



export default App;
