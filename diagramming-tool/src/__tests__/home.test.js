import {render,screen} from '@testing-library/react';
import Home from '../Component/Home/Home';
describe('Home Page',()=>{
    it ('Checks Page contain shapes heading', ()=>{
        render(<Home/>);
        const element =screen.getByText(/Shapes/i);
        expect(element).toBeInTheDocument();
    })
    
    it ('Rectangle Button Exist in Home Page', ()=>{
        render(<Home/>);
        const rect =screen.getByTestId(/rectangleButton/i);
        expect(rect).toBeInTheDocument();
    })
})
