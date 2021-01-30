# react-hook-outside
Call react hooks from outside of the components
## Installation
Using npm:

    npm install --save react-hook-outside
Import module

    // using ES6 modules    
    import  {  ReactHooksWrapper, setHook, getHook  }  from  "react-hook-outside";
## API

 - setHook( name, hook )
 - getHook( name )
## Demo
https://codesandbox.io/s/demo-react-hooks-outside-k8vh9

## Example

Add \<ReactHooksWrapper /> component to App.js file and declare some hooks

```javascript
	import { ReactHooksWrapper, setHook } from 'react-hook-outside';
	import React from 'react';
    //
    import  { useHistory }  from  "react-router-dom";
    import { useSnackbar } from "notistack";
	    
	setHook("history", useHistory)
	  .setHook("snackbar", useSnackbar)
	  // .setHook("hook1", useHook1)
	  // .setHook("hookWithArguments", useHookWithArguments.bind(null, arg1, arg2))
	  // .setHook("hook3", useHook3);
	  
	const App = ()=> {
	    return (
	      <div>
		      ...
		      <ReactHooksWrapper />
	      </div>
	    );
	}

	render(<App />, document.getElementById('root'));
```

   Then you can call the hook from any place you want
      
    import  { getHook }  from  "react-hook-outside";

	function goToPage(pathname){
		const history = getHook("history");
		history.push(pathname);
	}
