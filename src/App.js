import React, { useEffect, useState } from 'react';
import Card from './components/card';
import Preface from './components/Preface';
import './styles/App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import Repository from './components/Repository';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { getDatabase, ref, child, get } from "firebase/database";
import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';

const App = () => {
  const [content, setContent] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [prefixDesc, setPrefixDesc] = useState('');
  const [item, setItem] = useState({
    title: '',
    description: '',
  });
  const [clicked, setClicked] = useState(false);
  const [effect, setEffect] = useState('');
  const [effectDesc, setEffectDesc] = useState(``);
  const [curse, setCurse] = useState('');
  const [curseDesc, setCurseDesc] = useState(``);
  const [description, setDescription]=useState('');
  const [listItem, setListItem] = useState([]);
  const [typeRef, setTypeRef] = useState('Weapon');
  const [loading, setLoading] = useState(false);

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
 
  // database end points
  const dbRef = ref(getDatabase());

  const clearModel = [
    {
      label: 'Clear Prefix',
      command: (e) => {
        setPrefix(null);
        setPrefixDesc("");
      }, 
    },
    {
      label: 'Clear Curse',
      command: (e) => {
        setCurse(null);
        setCurseDesc("");
      },
    },
    {
      label: 'Clear Effect',
      command: (e) => {
        setEffect(null);
        setEffectDesc("");
      },
    },
  ];

  const saveButton = [
    {
      label: "Save",
      command: (e) => {
        const temp = listItem;
        temp.push({
          item,
          effect,
          prefix,
          curse,
          description,
        });
        setListItem(temp);
      },
    },
  ];

useEffect(() => console.log(listItem), [listItem]);

    const randy = (max, cur) => {
      let val = Math.floor(Math.random() * max);
      if (cur === val) {
        val = randy(max, val);
      }

      return val;
    };
    const fetchItemRef = () => {
      get(child(dbRef, `Types/`)).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          const rand = randy(3);
          setTypeRef(snapshot.val()[rand]);
          setClicked(!clicked);
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
    });
    }
    const getItemRef = () => {
      console.log(typeRef);
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
    const tempDesc = (
      <>
      {prefixDesc} <br />
      {curseDesc} <br />
      {item.description} <br />
      {effectDesc}
      </>
    );
    setDescription(tempDesc);
    console.log(tempDesc);
    };
  
  const clearState = () => {
    setPrefix(null);
    setPrefixDesc('');
    setCurse(null);
    setCurseDesc('');
    setEffect(null);
    setEffectDesc('');
    }

  const onPressGenerate = () => {
    setContent(true);
    fetchItemRef(); 
    clearState();
    };

  useEffect(() => {
    getItemDesc();
  }, [item, prefix, effect, curse]);

  useEffect(() => {
    if (content) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 600);
      setTimeout(() => getItemRef(), 100);
      console.log(typeRef);
    };
  }, [clicked]); 
    
  const onPressClear = () => {
    setContent(false);
    setItem({});
    clearState();
  };

  return (
    <div className="App">
     <h1>Random Item Generator</h1> 
     {(content )
     ? null
     : <Preface />}
     {(loading)
       ? <p>Loading...</p>
       : <Card
          prefix={prefix}
          item={item.title}
          effect={effect}
          curse={curse}
          description={description}
       />
     }
     < br />



     {(content) 
      ? <SplitButton
          label="Generate New Base Item"
          onClick={onPressGenerate}
          className="p-button-sm"
          model={saveButton}
      />
      : <Button
        className="p-button-sm"
        onClick={onPressGenerate}
        >
        Generate Base Item
      </Button>
    }

     {(content)
      ? <SplitButton
        label="Clear"
        className="p-button-sm"
        model={clearModel}
        onClick={onPressClear}
        />
      : null
      }

      <br />

        {(content)
          ? <Button
            className="p-button-sm"
          disabled={prefix}
          onClick={getPrefix}
          > 
            Add Prefix 
          </Button>
          : null
        }

      {(content)
          ? <Button
            className="p-button-sm"
          disabled={curse}
          onClick={getCurse}
          > 
            Add Curse
          </Button>
          : null
        }

          {(content)
          ? <Button
            className="p-button-sm"
          disabled={effect}
          onClick={getEffect}
          >
            Add Effect
          </Button>
          : null
        }
<br />
<br />
      <Repository
        allItems={listItem}
      />
      </div>
  );
};



export default App;
