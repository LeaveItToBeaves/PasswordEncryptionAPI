## PasswordEncryptionAPI

Password encryption web API to hide your database strings or anything else you choose to hide

This program implements AES encryption using the crypto-js library on an express framework.

This code uses the idea of split-key encryption. Multiple keys are used to hide your password in AES encryption, and the password cannot be found unless all keys are used, n-1 keys will not suffice. 
In order to do this, you first must call the API by sending the password along with some key components. You can generate key components using the built in getKeys call.
Once you call the encryption function, the program will encrypt the value you send to it based on the keys you send and also based on a file of keys included in the project called keys.json.
An example keys.json file has been provided, but when implementing this project you must create your own in the same manner.
This would make it very difficult for someone to crack your password unless they have your specfic keys.json file. You can generate a lot of keys using the getKeys function if you need some keys
When you call the decryption function it will essentially do the reverse of this process and send you back the password you encrypted

## Code Example

Using a POST on /encryptionService/encryption and passing this body:

	{
		"keyComponents": ["c023d51f-8b8b-4025-9c77-268c41acad9c",
		"7f554a7c-b815-4c5b-95c4-e4dcac5cc627",
		"7f8b40c5-331c-459a-8423-af9b4325327c"],

		"encryptionString":"n0t s3Cure Y3t",
	}

should get you a response along these lines : 
U2FsdGVkX1+pHgJ6pr8UCgHAovC/a1phQD4YLf7ggVo=

although the result will likely be different each time


taking that value you received and putting it in a value called encryptedString as such:

	{
		"keyComponents": ["c023d51f-8b8b-4025-9c77-268c41acad9c",
		"7f554a7c-b815-4c5b-95c4-e4dcac5cc627",
		"7f8b40c5-331c-459a-8423-af9b4325327c"],
	
		"encryptedString":"U2FsdGVkX1+pHgJ6pr8UCgHAovC/a1phQD4YLf7ggVo="
	}

and using a POST body to send it to /encryptionService/decryption should get you the result back of your original password.

The getKeys function is simply a GET function looking for the parameter getKeys to specify the number of keys you want to generate
The getKeys function uses UUID4 to generate 32-bit hex strings 

## Motivation

This project works as an easy way to keep your database connection strings/passwords out of plain text configuration files.
Instead of listing them out, you can simply call this API and get your password back so it isn't written anywhere

## Installation

This project requires at least node 4.5.0

In order to use this project simply run:

	git clone https://github.com/LeaveItToBeaves/PasswordEncryptionAPI.git
	cd PasswordEncryptionAPI
	npm install
	npm start

The API will now be running on your local machine on port 3000


## API Reference

Mostly described above, will make a more fleshed out tutorial once I am sure it is done.

## Tests

Tests coming soon

## Contributors

This is a simple personal project. Feel free to use it and make suggestions, but there isn't a whole lot of room for contribution
