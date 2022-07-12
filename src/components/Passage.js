import React, {useEffect, useState, useContext} from 'react';
import {VisibilityContext} from '../main.js';
import {useRect} from '../hooks/useRect.js';

export default function Passage(props) {
  const [visible, setVisible] = React.useState(props.visible);
  const {otherVisibilities, setOtherVisiblity, scrollPack} = useContext(VisibilityContext);
  const ref = React.useRef(null);

  useEffect(() => {
    const box = ref.current.getBoundingClientRect();
    if (box.top >= 0 && box.bottom <= window.innerHeight) {
      add();
      subtract();
    }
  })

  return (<p className="passage" ref={ref}>{props.children}</p>);

  function add() {
    if (!props.adds) {
      return
    }
    // if (props.id == "JL") {
      console.log(props.id, "adding", props.adds);
    // }
    if (Array.isArray(props.adds)) {
      props.adds.forEach((item, i) => {
        const new_v = Object.assign(otherVisibilities, {[item]: true});
        setOtherVisiblity(Object.assign({}, new_v));
      });
    } else {
      setOtherVisiblity(Object.assign(otherVisibilities, {[props.adds]: true}));
    }
  }

  function subtract() {
    if (!props.subtracts) {
      return
    }
    // if (props.id == "JL") {
        console.log(props.id, "subtracting", props.subtracts);
    // }
    if (Array.isArray(props.subtracts)) {
      props.subtracts.forEach((item, i) => {
        setOtherVisiblity(Object.assign(otherVisibilities, {[item]: false}));
      });
    } else {
      setOtherVisiblity(Object.assign(otherVisibilities, {[props.subtracts]: false}));
    }
  }
}
