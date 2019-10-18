import React from 'react';

import { Sidebar } from 'grommet-controls'
import { Box, Text } from 'grommet'

export default function SideNav() {
    return (
        <Box>
            <Sidebar
                title="Sidebar"
                border={{ size: "small" }}
                width="small"
                basis="small"
            // collapsible={false}
            >
                <Text>Item</Text>
                <Text>Item</Text>
                <Text>Item</Text>
            </Sidebar>
        </Box>
    )
}