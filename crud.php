<?php
include 'config.php';

$action = $_POST['action'] ?? $_GET['action'] ?? '';

if ($action === 'create') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $course = $_POST['course'];

    $stmt = $pdo->prepare("INSERT INTO students (name, email, phone, course) VALUES (?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $course]);
    echo json_encode(['success' => true]);
} elseif ($action === 'read') {
    $stmt = $pdo->query("SELECT * FROM students");
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($students);
} elseif ($action === 'update') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $course = $_POST['course'];

    $stmt = $pdo->prepare("UPDATE students SET name=?, email=?, phone=?, course=? WHERE id=?");
    $stmt->execute([$name, $email, $phone, $course, $id]);
    echo json_encode(['success' => true]);
} elseif ($action === 'delete') {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("DELETE FROM students WHERE id=?");
    $stmt->execute([$id]);
    echo json_encode(['success' => true]);
} elseif ($action === 'get') {
    $id = $_GET['id'];
    $stmt = $pdo->prepare("SELECT * FROM students WHERE id=?");
    $stmt->execute([$id]);
    $student = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($student);
}
?>