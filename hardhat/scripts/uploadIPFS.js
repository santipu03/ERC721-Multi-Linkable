async function run() {
  const { create } = await import("ipfs-http-client");
  const ipfs = await create();

  // we added three attributes, add as many as you want!
  const metadata = {
    path: "/",
    content: JSON.stringify({
      name: "E7L Certificate",
      attributes: [
        {
          trait_type: "Hard Work",
          value: "100",
        },
        {
          trait_type: "Grind",
          value: "120",
        },
        {
          trait_type: "Web3",
          value: "1000",
        },
      ],
      // update the IPFS CID to be your image CID
      image:
        "https://ipfs.io/ipfs/QmUS3JDeJXU8uB9K94URMttJBVwSLZyvzbCZusdPL94FAe?filename=corporate.png",
      description: "A ERC721 Multi Linkable Token",
    }),
  };

  const result = await ipfs.add(metadata);
  console.log(result);

  process.exit(0);
}

run();
