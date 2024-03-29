<?php
// src/Controller/RegistrationController.php
namespace App\Controller;

use App\Entity\Cart;
use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class RegistrationController
{
    private UserRepository $userRepo;
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserRepository $userRepo, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager)
    {
        $this->userRepo = $userRepo;
        $this->passwordHasher = $passwordHasher;
        $this->entityManager = $entityManager;
    }

    public function __invoke(Request $request): User | JsonResponse
    {
        $user = new User();
        $data = json_decode($request->getContent(), true);
        $email = $data["email"];
        $password = $data["password"];

        $emailExist = $this->userRepo->findOneByEmail($email);

        if ($emailExist) {
            return new JsonResponse(["code" => JsonResponse::HTTP_CONFLICT, "message" => "Email already exists."], JsonResponse::HTTP_CONFLICT);
        }

        $user->setEmail($email);
        $hashedPassword = $this->passwordHasher->hashPassword(
            $user,
            $password
        );
        $user->setPassword($hashedPassword);
        $cart = new Cart();
        $this->entityManager->persist($cart);
        $this->entityManager->flush();
        $user->setCart($cart);

        return $user;
    }
}
