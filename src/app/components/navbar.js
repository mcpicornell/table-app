"use client";
import { useRouter } from "next/navigation";
import styled from "styled-components";


const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-gradient-to-r from-blue-400 to-purple-500 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <Container className="text-white" onClick={() => router.push(`/`)}>
          <p className="text-2xl font-semibold">Home</p>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;

const Container = styled.div`
cursor: pointer;
`;