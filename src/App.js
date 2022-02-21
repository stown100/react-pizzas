import React from 'react';
// import axios from 'axios';
import { Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import { Header } from './components';
import { Home, Cart } from './pages';

// На функциональном компоненте
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Route path="/" component={Home} exact />
        <Route path="/cart" component={Cart} exact />
      </div>
    </div>
  )
}

export default App;

// На классовом компоненте

// class App extends React.Component {
//   componentDidMount() {
//     axios.get('http://localhost:3000/db.json').then(({ data }) => this.props.setPizzas(data.pizzas))
//   }
//   render() {
//     return (
//       <div className="wrapper">
//         <Header />
//         <div className="content">
//           <Route path="/" exact>
//             <Home items={this.props.items} />
//           </Route>
//           <Route path="/cart" exact>
//             <Cart />
//           </Route>
//         </div>
//       </div>
//     )
//   }
// }

// // Для того, чтобы достать данные и засунуть их в пропсы
// const mapStateToProps = state => {
//   return {
//     items: state.pizzas.items
//   }
// }

// // Для того, чтобы засунуть в опр. компоненты Action Creaters
// const mapDispatchToProps = dispatch => {
//   return {
//     setPizzas: (items) => dispatch(setPizzas(items)),
//   }
// }
// // connect подключает компонент к хранилищу
// export default connect(mapStateToProps, mapDispatchToProps)(App);
