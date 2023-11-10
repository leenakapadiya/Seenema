const loadMainScreen = () => {
    // Stubbing the actual screen load process
    return "Main screen loaded"; 
};

test('Main screen loads after login', () => {
    expect(loadMainScreen()).toBe("Main screen loaded");
});
