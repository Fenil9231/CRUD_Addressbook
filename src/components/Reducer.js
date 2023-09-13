export const getInitialFormValues = () => ({
    name : "",
    email : "",
    city : "",
    phoneNumber : []
})



export const TAB_IDS = {
    'ADD_USER': 'add',
    'EDIT_USER': 'edit',
    'VIEW_USER': 'view',
    
};

export const TABS = [
    {
        id: TAB_IDS.ADD_USER,
        text: 'Add Data'
    },
    {
        id: TAB_IDS.EDIT_USER,
        text: 'Edit Data'
    },
    {
        id: TAB_IDS.VIEW_USER,
        text: 'View Data'
    },
  
];