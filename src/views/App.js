import React, { useCallback, useEffect, useState } from 'react';
import Card from '../components/card';
import Preface from '../components/Preface';
import Checkbox from '../components/Checkbox';
import '../styles/App.css';
import Repository from '../components/Repository';
import { getDatabase, ref, child, get, query, orderByChild } from "firebase/database";
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';

const App = () => {
  const variable = "cool item";
  const title = `Random Item ${variable}`;

  const [content, setContent] = useState(false);
  const [preChk, setPreChk] = useState(false);
  const [efChk, setEfChk] = useState(false);
  const [curseChk, setCurseChk] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [prefixDesc, setPrefixDesc] = useState('');
  const [item, setItem] = useState({
    title: '',
    description: '',
  });
  const [effect, setEffect] = useState('');
  const [effectDesc, setEffectDesc] = useState(``);
  const [curse, setCurse] = useState('');
  const [curseDesc, setCurseDesc] = useState(``);
  const [buttonLabel, setButtonLabel]= useState('Generate');
  const [description, setDescription]=useState('');

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
     const fetchItemRef = () => {
        get(child(dbRef, `Types/`)).then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            const rand = randy(3);
            setTypeRef(snapshot.val()[rand]);
            getItemRef();
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
      });
     }
     
     const getItemRef = () => {
       get(child(dbRef, `${typeRef}/`)).then((snapshot) => {
         if (snapshot.exists()) {
          let result = Object.keys(snapshot.val()).map(e => {
            let res = {};
            res[e] = snapshot.val()[e];
            return res;
          })
          const rand = randy(result.length);
          const itemText = Object.entries(result[rand]);
           setItem({
            title: Object.keys(result[rand]),
            description: itemText[0][1],
          }); 
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
          let allowedPrefixName, allowedPrefixDesc; 

          if (allowedPrefix) {
            console.log(allowedPrefix);
            allowedPrefixName = snap[pRand].Title;
            allowedPrefixDesc = snap[pRand][allowedPrefix];
            setPrefix(allowedPrefixName);
            setPrefixDesc(allowedPrefixDesc);
          } else {
            pRand = randy(snap.length, pRand);
            allowedPrefix = snap[pRand].TypesAllowed[snap[pRand].TypesAllowed.indexOf(typeRef)];

            console.log(allowedPrefix);
            allowedPrefixName = snap[pRand].Title;
            allowedPrefixDesc = snap[pRand][allowedPrefix];
            setPrefix(allowedPrefixName);
            setPrefixDesc(allowedPrefixDesc);
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
          let allowedCurseName, allowedCurseDesc;

          if (allowedCurse) {
            console.log(allowedCurse);
            allowedCurseName = snap[cRand].Title;
            allowedCurseDesc = snap[cRand][allowedCurse];
            setCurse(allowedCurseName);
            setCurseDesc(allowedCurseDesc);
          } else {
            cRand = randy(snap.length, cRand);
            allowedCurse = snap[cRand].TypesAllowed[snap[cRand].TypesAllowed.indexOf(typeRef)];

            console.log(allowedCurse);
            allowedCurseName = snap[cRand].Title;
            allowedCurseDesc = snap[cRand][allowedCurse];
            setCurse(allowedCurseName);
            setCurseDesc(allowedCurseDesc);
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
          let allowedEffectName, allowedEffectDesc;

          if (allowedEffect) {
            console.log(allowedEffect);
            allowedEffectName = snap[efRand].Title;
            allowedEffectDesc = snap[efRand][allowedEffect];
            setEffect(allowedEffectName);
            setEffectDesc(allowedEffectDesc);
          } else {
            efRand = randy(snap.length, efRand);
            allowedEffect = snap[efRand].TypesAllowed[snap[efRand].TypesAllowed.indexOf(typeRef)];

            console.log(allowedEffect);
            allowedEffectName = snap[efRand].Title;
            allowedEffectDesc = snap[efRand][allowedEffect];
            setEffect(allowedEffectName);
            setEffectDesc(allowedEffectDesc);
          };
        };
      });
     };

  const getItemDesc = () => {
    const tempDesc = `${prefixDesc} ${curseDesc} ${item.description} ${effectDesc}`;
    setDescription(tempDesc);
    console.log(tempDesc);
    };
  
  const onPressGenerate = () => {
    setButtonLabel('Generate Another');
    setContent(true);
    fetchItemRef(); 
  };

  useEffect(() => {
    if (preChk) {
      getPrefix();
    } else {
      setPrefix(null);
      setPrefixDesc('');
    }
    if (curseChk) {
      getCurse();
    } else {
      setCurse(null);
      setCurseDesc('');
    }
    if (efChk) {
      getEffect();
    } else {
      setEffect(null);
      setEffectDesc('');
    }
    getItemDesc();
  }, [item, prefix, effect, curse]);

  const onPressHome = () => {
    setContent(false);
  };

  return (
    <div className="App">
     {title}
     {(content)
       ? <Card
          prefix={prefix}
          item={item.title}
          effect={effect}
          curse={curse}
          description={description}
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
