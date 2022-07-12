import React, {useEffect, useState} from 'react';
import {useScroll} from './hooks/useScroll';
import {render} from 'react-dom';
import Amnesiac from './jsx/Amnesiac';

export const VisibilityContext = React.createContext("foo");

function Root(props) {
  const scrollPack = useScroll();
  const [initialProgress, _] = useState(new URLSearchParams(window.location.search).get('progress'));

  const [passageVisibilities, setPassageVisibilities] = useState(() => {
    let pv = {};
    Amnesiac.forEach((item, i) => {
      if (Array.isArray(item.props.children)) {
        item.props.children.forEach((passage, j) => {
          Object.assign(pv, {[passage.props.id]: passage.props.visible});
        });
      } else {
        const passage = item.props.children;
        Object.assign(pv, {[passage.props.id]: passage.props.visible});
      }
    })
    return pv;
  });

  function findVisible() {
    const visible = [];
    for (let key in passageVisibilities) {
      if (passageVisibilities[key]) {
        visible.push(key);
      }
    }
    return visible;
  }

  function updateURL() {
    const oldProgress = parseProgress((new URLSearchParams(window.location.search).get('progress')));
    const oldScrollY = oldProgress ? oldProgress.scrollPack.scrollY : 0;
    if (Math.abs(scrollPack.scrollY - oldScrollY) > 30) {
      const visible = findVisible();
      const progress = visible.join("~") + "-" + scrollPack.scrollY + "-" + scrollPack.scrollX;
      window.history.replaceState({}, document.title, `/?progress=${progress}`);
    }
  }

  function parseProgress(str) {
    if (str) {
      const fields = str.split("-");
      const out = {
        visible: fields[0].split("~"),
        scrollPack: {scrollX: fields[2], scrollY: fields[1]}
      }

      return out;
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (initialProgress) {

      const parsed = parseProgress(initialProgress);
      setTimeout(function() {
        window.scrollTo(parsed.scrollPack.scrollX, parsed.scrollPack.scrollY);
      }, 2)

      const newVisibilities = {};
      Object.assign(newVisibilities, passageVisibilities);
      for (let key in newVisibilities) {
        newVisibilities[key] = false;
      }
      parsed.visible.forEach((item, i) => {
        newVisibilities[item] = true;
      });

      setPassageVisibilities(Object.assign({}, passageVisibilities, newVisibilities));
    }
  }, []);

  useEffect(() => {
    updateURL();
  });

  const to_render = Amnesiac.map((item, i) => {
    if (Array.isArray(item.props.children)) {
      return (<p>{item.props.children.map((passage, j) => {
        if (passageVisibilities[passage.props.id] == true) {
          return passage;
        } else {
          return null;
        }
      })}</p>);
    } else {
      const passage = item.props.children;
      if (passageVisibilities[passage.props.id] == true) {
        return item;
      } else {
        return <p></p>;
      }
    }
  })

  return (
    <VisibilityContext.Provider value={{otherVisibilities: passageVisibilities, setOtherVisiblity: setPassageVisibilities, scrollPack: scrollPack}}>
      <div style={{marginTop: 0}}>
        {to_render}
      </div>
    </VisibilityContext.Provider>
  )
}

const domContainer = document.querySelector('#main');
render(<Root />, domContainer)
