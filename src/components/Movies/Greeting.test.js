import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import renderer from 'react-test-renderer';
import Greeting from "./Greeting";

describe('Greeting componets', ()=>{
    test("Render Hello World", () => {
        // arrange
      
        render(<Greeting />);
      
        //Act

        // nothing

       
        //assert
      
        const helloWorldElement = screen.getByText("Hello Unit Test World!");
      
        expect(helloWorldElement).toBeInTheDocument();
      });

      test('renders good to see you if the button was not click', ()=>{
        render(<Greeting/>)
        const outputElement = screen.getByText("glad to see you", {exact: false} );
        expect(outputElement).toBeInTheDocument();


      });

      test('render change if the button was click', () =>{
        //arrange
        render(<Greeting/>)
        // Act

        const buttonElement = screen.getByRole('button')
        //        const buttonElement = screen.getByText('button')

        userEvent.click(buttonElement)
      
        // Assert
        const outputElement = screen.getByText("Changed!");
        expect(outputElement).toBeInTheDocument();
      });

      test('doesnot render "glad to see you if button was click" ', ()=>{
         //arrange
         render(<Greeting/>)
         // Act
 
         const buttonElement = screen.getByRole('button')
         //        const buttonElement = screen.getByText('button')
 
         userEvent.click(buttonElement)

         const outputElement = screen.queryByText("glad to see you", {exact: false} );
         //         const outputElement = screen.getByText("glad to see you", {exact: false} );

         expect(outputElement).toBeNull();


      })
})


describe('SnapShot matches', ()=>{
    it('renders correctly', () => {
        const tree = renderer
          .create(<Greeting/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
})



