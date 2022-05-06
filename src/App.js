import PersonList from "./components/personList";
import CreatePerson from "./components/createPerson";
import {useReducer} from "react";
import personReducer from "./reducers/personReducer";
import PersonContext from "./contexts/personContext";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import UpdatePerson from "./components/updatePerson";


function App() {
    const initialState = [
        {id: 1, key: 1, name: "Hüseyin", surname: "Özkaya", age: 25, gender: 'Erkek'},
        {id: 2, key: 2, name: "Yavuz Selim", surname: "Kahraman", age: 30, gender: 'Erkek'},
    ];
    const [personList, dispatch] = useReducer(personReducer, initialState);

    return (
        <>
            <PersonContext.Provider value={{personList, dispatch}}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<PersonList/>}>
                        </Route>
                        <Route
                            path="/person/create"
                            element={<CreatePerson/>}>
                        </Route>
                        <Route
                            path="/person/:id"
                            element={<UpdatePerson></UpdatePerson>}>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersonContext.Provider>
        </>
    );
}

export default App;
