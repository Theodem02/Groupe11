'use client';

import React from 'react';
import Link from 'next/link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

const NavigationMenu = () => {
  return (
   <> 
    <Breadcrumbs aria-label="breadcrumb" className="flex justify-center m-4">
      <Link color="inherit" href="/">Homepage</Link>
      <Link color="inherit" href="/authors">Authors</Link>
      <Link color="inherit" href="/books">Books</Link>
    </Breadcrumbs>

    </>
  );
};

export default NavigationMenu;
