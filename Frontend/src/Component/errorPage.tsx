import React from 'react';

const ErrorPage: React.FC<{ message?: string }> = ({ message }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-amber-50 p-8 text-center">
      <h1 className="text-4xl font-bold mb-6 text-red-700"> Sorry, there is a problem.</h1>
      <p className="mb-4 text-lg text-red-600">
        {message || "The database is not connected."}
      </p>
      <p className="max-w-md text-sm text-red-500">
        Please make sure to add your current IP address in your MongoDB Atlas network access settings.  
        <br />
        You can find this under <strong>Network Access &gt; IP Whitelist</strong> in the MongoDB Atlas dashboard.
      </p>
    </div>
  );
};

export default ErrorPage;
