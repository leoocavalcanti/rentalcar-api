import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({text, value, onChange, onClick}) {

  return (
    <form id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
        
        </FormLabel>
        <Input
          className="searchBar"
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder={text}
          type="text"
          required
          value={value}
          onChange={onChange}
          endDecorator={
            <Button
              
              onClick={onClick}
              style={{background: "#1D2950"}}
              variant="solid"
              color="primary"
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              <SearchIcon/>
            </Button>
          }
        />
      </FormControl>
    </form>
  );
}